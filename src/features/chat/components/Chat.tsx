import { UserContext } from "@/global/lib/chat/UserContext";
import { ChatMessage } from "@/global/types/chat/ChatCompletion";
import { Conversation } from "@/global/types/chat/Conversation";
import { OpenAIModel } from "@/global/types/chat/model";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatService } from "../services/ChatService";
import { NotificationService } from "../services/NotificationService";
import { Tooltip } from "@mantine/core";
import { ChatConfig } from "@/global/constants/Chat";
import { DEFAULT_INSTRUCTIONS } from "@/global/constants/appConstants";
import { IconInfoCircle } from "@tabler/icons-react";
import ChatBlock from "./ChatBlock";

interface Props {
  chatBlocks: ChatMessage[];
  onChatScroll: (isAtBottom: boolean) => void;
  allowAutoScroll: boolean;
  model: string | null;
  onModelChange: (value: string | null) => void;
  conversation: Conversation | null;
  loading: boolean;
}

const Chat: React.FC<Props> = ({
  chatBlocks,
  onChatScroll,
  allowAutoScroll,
  model,
  onModelChange,
  conversation,
  loading,
}) => {
  const { userSettings, setUserSettings } = useContext(UserContext);
  const [models, setModels] = useState<OpenAIModel[]>([]);
  const chatDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ChatService.getModels()
      .then((models) => {
        setModels(models);
      })
      .catch((err) => {
        NotificationService.handleUnexpectedError(
          err,
          "Failed to get list of models"
        );
      });
  }, []);

  useEffect(() => {
    if (chatDivRef.current && allowAutoScroll) {
      chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
    }
  }, [chatBlocks]);

  useEffect(() => {
    const chatContainer = chatDivRef.current;
    if (chatContainer) {
      const isAtBottom =
        chatContainer.scrollHeight - chatContainer.scrollTop ===
        chatContainer.clientHeight;

      // Initially hide the button if chat is at the bottom
      onChatScroll(isAtBottom);
    }
  }, []);

  const findModelById = (id: string | null): OpenAIModel | undefined => {
    return models.find((model) => model.id === id);
  };

  const formatContextWindow = (context_window: number | undefined) => {
    if (context_window) {
      return Math.round(context_window / 1000) + "k";
    }
    return "?k";
  };

  const handleScroll = () => {
    if (chatDivRef.current) {
      const scrollThreshold = 20;
      const isAtBottom =
        chatDivRef.current.scrollHeight - chatDivRef.current.scrollTop <=
        chatDivRef.current.clientHeight + scrollThreshold;

      // Notify parent component about the auto-scroll status
      onChatScroll(isAtBottom);

      // Disable auto-scroll if the user scrolls up
      if (!isAtBottom) {
        onChatScroll(false);
      }
    }
  };

  return (
    <div id={"chat-container"} ref={chatDivRef} onScroll={handleScroll}>
      <div id={"chat-container1"}>
        <div>
          <div>
            {!conversation ? (
              ""
            ) : (
              <Tooltip
                label={
                  conversation.systemPrompt ??
                  userSettings.instructions ??
                  ChatConfig.defaultSystemPrompt ??
                  DEFAULT_INSTRUCTIONS
                }
              >
                <span
                  style={{
                    marginLeft: "10px",
                    fontSize: "0.85rem",
                    color: "#6b7280",
                  }}
                >
                  <IconInfoCircle size={20} stroke={1.5} />
                </span>
              </Tooltip>
            )}
            <span
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              model
              {conversation && (
                <span>
                  <span style={{ marginLeft: "0.25em" }}>
                    {conversation.model}
                  </span>
                  <Tooltip label={"context-window"}>
                    <span
                      style={{
                        marginLeft: "10px",
                        fontSize: "0.85rem",
                        color: "#6b7280",
                      }}
                    >
                      {formatContextWindow(
                        findModelById(conversation.model)?.context_window
                      )}
                    </span>
                  </Tooltip>
                  <Tooltip label={"knowledge-cutoff"}>
                    <span
                      style={{
                        marginLeft: "10px",
                        fontSize: "0.85rem",
                        color: "#6b7280",
                      }}
                    >
                      {findModelById(conversation.model)?.knowledge_cutoff}
                    </span>
                  </Tooltip>
                </span>
              )}
            </span>
          </div>
        </div>
        {chatBlocks.map((block, index) => (
          <ChatBlock
            key={`chat-block-${block.id}`}
            block={block}
            loading={index === chatBlocks.length - 1 && loading}
            isLastBlock={index === chatBlocks.length - 1}
          />
        ))}
        <div className="w-full h-24 flex-shrink-0"></div>
      </div>
    </div>
  );
};

export default Chat;
