/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChatSettings } from "@/global/types/chat/ChatSettings";
import { Conversation } from "@/global/types/chat/Conversation";
import { MessageBoxHandles } from "@/global/types/chat/MessageBox";
import { OpenAIModel } from "@/global/types/chat/model";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ConversationService from "../services/ConversationService";
import { ChatService } from "../services/ChatService";
import { UserContext } from "@/global/lib/chat/UserContext";
import { NotificationService } from "../services/NotificationService";
import chatSettingsDB, {
  updateShowInSidebar,
} from "../services/ChatSettingsDB";
import {
  CONVERSATION_NOT_FOUND,
  DEFAULT_INSTRUCTIONS,
  DEFAULT_MODEL,
  MAX_TITLE_LENGTH,
  SNIPPET_MARKERS,
} from "@/global/constants/appConstants";
import { FileDataRef } from "@/global/types/chat/FileData";
import { ChatConfig } from "@/global/constants/Chat";
import { CustomError } from "../services/CustomError";
import ChatSettingDropdownMenu from "../components/ChatSettingDropdownMenu";
import CustomChatSplash from "../components/CustomChatSplash";
import Chat from "../components/Chat";
import MessageBox from "../components/MessageBox";
import {
  ChatCompletion,
  ChatMessage,
  MessageType,
  Role,
} from "@/global/types/chat/ChatCompletion";
import { Box, Container } from "@mantine/core";

function getFirstValidString(...args: (string | undefined | null)[]): string {
  for (const arg of args) {
    if (arg !== null && arg !== undefined && arg.trim() !== "") {
      return arg;
    }
  }
  return "";
}

const ChatOverview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { id, gid } = useParams<{ id?: string; gid?: string }>();

  const { userSettings, setUserSettings } = useContext(UserContext);
  const [chatSettings, setChatSettings] = useState<ChatSettings | undefined>(
    undefined
  );
  const [conversation, setConversation] = useState<Conversation | null>(null);

  const [model, setModel] = useState<OpenAIModel | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [loading, setLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [allowAutoScroll, setAllowAutoScroll] = useState(true);

  const messageBoxRef = useRef<MessageBoxHandles>(null);

  const chatSettingsRef = useRef(chatSettings);

  useEffect(() => {
    chatSettingsRef.current = chatSettings;
  }, [chatSettings]);

  useEffect(() => {
    if (location.pathname === "/") {
      newConversation();
    } else {
      if (id) {
        handleSelectedConversation(id);
      } else {
        newConversation();
      }
    }

    if (gid) {
      const gidNumber = Number(gid);
      if (!isNaN(gidNumber)) {
        fetchAndSetChatSettings(gidNumber);
      } else {
        setChatSettings(undefined);
      }
    } else {
      setChatSettings(undefined);
    }
  }, [gid, id, location.pathname]);

  useEffect(() => {
    if (location.state?.reset) {
      messageBoxRef.current?.reset();
      messageBoxRef.current?.focusTextarea();
    }
  }, [location.state]);

  useEffect(() => {
    if (messages.length === 0) {
      setConversation(null);
    }
    if (conversation && conversation.id) {
      // Only update if there are messages
      if (messages.length > 0) {
        ConversationService.updateConversation(conversation, messages);
      }
    }
  }, [messages]);

  //
  const fetchModelById = async (
    modelId: string
  ): Promise<OpenAIModel | null> => {
    try {
      const fetchedModel = await ChatService.getModelById(modelId);
      return fetchedModel;
    } catch (error) {
      console.error("Failed to fetch model:", error);
      if (error instanceof Error) {
        NotificationService.handleUnexpectedError(
          error,
          "Failed to fetch model."
        );
      }
      return null;
    }
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        ChatService.cancelStream();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    if (userSettings.model) {
      fetchModelById(userSettings.model).then(setModel);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const chatSettingsListener = (data: { gid?: number }) => {
    const currentChatSettings = chatSettingsRef.current;
    if (data && typeof data === "object") {
      if (currentChatSettings && currentChatSettings.id === data.gid) {
        fetchAndSetChatSettings(data.gid);
      }
    } else {
      if (currentChatSettings) {
        fetchAndSetChatSettings(currentChatSettings.id);
      }
    }
  };

  const fetchAndSetChatSettings = async (gid: number) => {
    try {
      const settings = await chatSettingsDB.chatSettings.get(gid);
      setChatSettings(settings);
      if (settings) {
        if (settings.model === null) {
          setModel(null);
        } else {
          fetchModelById(settings.model).then(setModel);
        }
      }
    } catch (error) {
      console.error("Failed to fetch chat settings:", error);
    }
  };

  const clearInputArea = () => {
    messageBoxRef.current?.clearInputValue();
  };
  const newConversation = () => {
    setConversation(null);
    setShowScrollButton(false);
    clearInputArea();
    setMessages([]);
    messageBoxRef.current?.focusTextarea();
  };
  const handleSelectedConversation = (id: string | null) => {
    if (id && id.length > 0) {
      const n = Number(id);
      ConversationService.getConversationById(n).then((conversation) => {
        if (conversation) {
          setConversation(conversation);
          clearInputArea();
          ConversationService.getChatMessages(conversation).then(
            (messages: ChatMessage[]) => {
              if (messages.length == 0) {
                // Race condition: the navigate to /c/id and the updating of the messages state
                // are happening at the same time.
                console.warn("possible state problem");
              } else {
                setMessages(messages);
              }
            }
          );
        } else {
          const errorMessage: string =
            "Conversation " + location.pathname + " not found";
          NotificationService.handleError(errorMessage, CONVERSATION_NOT_FOUND);
          navigate("/");
        }
      });
    } else {
      newConversation();
    }
    setAllowAutoScroll(true);
    setShowScrollButton(false);
    messageBoxRef.current?.focusTextarea();
  };

  function getTitle(message: string): string {
    const title = message.trimStart(); // Remove leading newlines
    let firstNewLineIndex = title.indexOf("\n");
    if (firstNewLineIndex === -1) {
      firstNewLineIndex = title.length;
    }
    return title.substring(0, Math.min(firstNewLineIndex, MAX_TITLE_LENGTH));
  }

  function getEffectiveChatSettings(): ChatSettings {
    let effectiveSettings = chatSettings;
    if (!effectiveSettings) {
      effectiveSettings = {
        id: 0,
        author: "system",
        name: "default",
        model: model?.id || DEFAULT_MODEL,
      };
    }
    return effectiveSettings;
  }

  function startConversation(message: string, fileDataRef: FileDataRef[]) {
    const id = Date.now();
    const timestamp = Date.now();
    const shortenedText = getTitle(message);
    const instructions = getFirstValidString(
      chatSettings?.instructions,
      userSettings.instructions,
      ChatConfig.defaultSystemPrompt,
      DEFAULT_INSTRUCTIONS
    );
    const conversation: Conversation = {
      id: id,
      gid: getEffectiveChatSettings().id,
      timestamp: timestamp,
      title: shortenedText,
      model: model?.id || DEFAULT_MODEL,
      systemPrompt: instructions,
      messages: "[]",
    };
    setConversation(conversation);
    ConversationService.addConversation(conversation);
    if (gid) {
      navigate(`/g/${gid}/c/${conversation.id}`);
      updateShowInSidebar(Number(gid), 1);
    } else {
      navigate(`/c/${conversation.id}`);
    }
  }

  const handleModelChange = (value: string | null) => {
    if (value === null) {
      setModel(null);
    } else {
      fetchModelById(value).then(setModel);
    }
  };

  function handleStreamedResponse(content: string, fileDataRef: FileDataRef[]) {
    setMessages((prevMessages) => {
      let isNew: boolean = false;
      try {
        // todo: this shouldn't be necessary
        if (prevMessages.length == 0) {
          console.error(
            "prevMessages should not be empty in handleStreamedResponse."
          );
          return [];
        }
        if (prevMessages[prevMessages.length - 1].role == Role.User) {
          isNew = true;
        }
      } catch (e) {
        console.error("Error getting the role");
        console.error("prevMessages = " + JSON.stringify(prevMessages));
        console.error(e);
      }

      if (isNew) {
        const message: ChatMessage = {
          id: prevMessages.length + 1,
          role: Role.Assistant,
          messageType: MessageType.Normal,
          content: content,
          fileDataRef: fileDataRef,
        };
        return [...prevMessages, message];
      } else {
        // Clone the last message and update its content
        const updatedMessage = {
          ...prevMessages[prevMessages.length - 1],
          content: prevMessages[prevMessages.length - 1].content + content,
        };

        // Replace the old last message with the updated one
        return [...prevMessages.slice(0, -1), updatedMessage];
      }
    });
  }

  function sendMessage(updatedMessages: ChatMessage[]) {
    setLoading(true);
    clearInputArea();
    const systemPrompt = getFirstValidString(
      conversation?.systemPrompt,
      chatSettings?.instructions,
      userSettings.instructions,
      ChatConfig.defaultSystemPrompt,
      DEFAULT_INSTRUCTIONS
    );
    const messages: ChatMessage[] = [
      {
        role: Role.System,
        content: systemPrompt,
      } as ChatMessage,
      ...updatedMessages,
    ];

    const effectiveSettings = getEffectiveChatSettings();

    ChatService.sendMessageStreamed(
      effectiveSettings,
      messages,
      handleStreamedResponse
    )
      .then((response: ChatCompletion) => {
        // nop
      })
      .catch((err) => {
        if (err instanceof CustomError) {
          const message: string = err.message;
          setLoading(false);
          addMessage(Role.Assistant, MessageType.Error, message, []);
        } else {
          NotificationService.handleUnexpectedError(
            err,
            "Failed to send message to openai."
          );
        }
      })
      .finally(() => {
        setLoading(false); // Stop loading here, whether successful or not
      });
  }

  const callApp = (message: string, fileDataRef: FileDataRef[]) => {
    if (!conversation) {
      startConversation(message, fileDataRef);
    }
    setAllowAutoScroll(true);
    addMessage(
      Role.User,
      MessageType.Normal,
      message,
      fileDataRef,
      sendMessage
    );
  };

  const addMessage = (
    role: Role,
    messageType: MessageType,
    message: string,
    fileDataRef: FileDataRef[],
    callback?: (callback: ChatMessage[]) => void
  ) => {
    const content: string = message;

    setMessages((prevMessages: ChatMessage[]) => {
      const message: ChatMessage = {
        id: prevMessages.length + 1,
        role: role,
        messageType: messageType,
        content: content,
        fileDataRef: fileDataRef,
      };
      return [...prevMessages, message];
    });

    const newMessage: ChatMessage = {
      id: messages.length + 1,
      role: role,
      messageType: messageType,
      content: content,
      fileDataRef: fileDataRef,
    };
    const updatedMessages = [...messages, newMessage];
    if (callback) {
      callback(updatedMessages);
    }
  };
  const scrollToBottom = () => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scroll({
        top: chatContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  const handleUserScroll = (isAtBottom: boolean) => {
    setAllowAutoScroll(isAtBottom);
    setShowScrollButton(!isAtBottom);
  };

  const handleQuoteSelectedText = () => {
    const selection = window.getSelection();
    if (selection) {
      const selectedText = selection.toString();
      const modifiedText = `Assistant wrote:\n${SNIPPET_MARKERS.begin}\n${selectedText}\n${SNIPPET_MARKERS.end}\n`;
      messageBoxRef.current?.pasteText(modifiedText);
      messageBoxRef.current?.focusTextarea();
    }
  };

  return (
    <Box
      p={"md"}
      style={{
        backgroundColor: "white",
      }}
    >
      <Container size={"xl"}>
        {gid ? (
          <div>
            <ChatSettingDropdownMenu chatSetting={chatSettings} />
          </div>
        ) : null}
        {!conversation && chatSettings ? (
          <CustomChatSplash
            className=" -translate-y-[10%] "
            chatSettings={chatSettings}
          />
        ) : null}
        <div
          style={{ height: "55vh", display: "flex", flexDirection: "column" }}
        >
          <Chat
            chatBlocks={messages}
            onChatScroll={handleUserScroll}
            conversation={conversation}
            model={model?.id || DEFAULT_MODEL}
            onModelChange={handleModelChange}
            allowAutoScroll={allowAutoScroll}
            loading={loading}
          />
        </div>
        <MessageBox
          ref={messageBoxRef}
          callApp={callApp}
          loading={loading}
          setLoading={setLoading}
          allowImageAttachment={
            model === null || model?.image_support || false
              ? "yes"
              : !conversation
              ? "warn"
              : "no"
          }
        />
      </Container>
    </Box>
  );
};

export default ChatOverview;
