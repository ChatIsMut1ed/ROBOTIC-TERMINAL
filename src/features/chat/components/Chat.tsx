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
  conversation,
  loading,
}) => {
  const { userSettings } = useContext(UserContext);
  const [models, setModels] = useState<OpenAIModel[]>([]);
  const chatDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ChatService.getModels()
      .then((models) => setModels(models))
      .catch((err) =>
        NotificationService.handleUnexpectedError(
          err,
          "Failed to get list of models"
        )
      );
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
      onChatScroll(isAtBottom);
    }
  }, []);

  const handleScroll = () => {
    if (chatDivRef.current) {
      const isAtBottom =
        chatDivRef.current.scrollHeight - chatDivRef.current.scrollTop <=
        chatDivRef.current.clientHeight + 20;
      onChatScroll(isAtBottom);
      if (!isAtBottom) onChatScroll(false);
    }
  };

  const findModelById = (id: string | null): OpenAIModel | undefined => {
    return models.find((model) => model.id === id);
  };

  const formatContextWindow = (context_window: number | undefined) => {
    return context_window ? `${Math.round(context_window / 1000)}k` : "?k";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Fixed section for model info */}
      <div
        style={{
          padding: "0.5em 0",
          border: "1px solid #000",
          marginBottom: "5px",
        }}
      >
        {conversation ? (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "10px",
                    fontSize: "0.85rem",
                    color: "#6b7280",
                    cursor: "pointer",
                  }}
                >
                  <IconInfoCircle size={20} stroke={1.5} />
                </span>
              </Tooltip>

              <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
                Model:
              </span>
              <span style={{ marginLeft: "0.5em", color: "#333" }}>
                {/* {conversation.model} */}
                OORB-CHAT
              </span>
              <div
                style={{
                  color: "#6b7280",
                  fontSize: "0.85rem",
                }}
              >
                {/* <Tooltip label="Context Window">
                  <span style={{ marginLeft: "10px" }}>
                    {formatContextWindow(
                      findModelById(conversation.model)?.context_window
                    )}
                  </span>
                </Tooltip> */}
                <Tooltip label="Knowledge Cutoff">
                  <span style={{ marginLeft: "15px" }}>
                    {findModelById(conversation.model)?.knowledge_cutoff ??
                      "N/A"}
                  </span>
                </Tooltip>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Tooltip label={"Start Chating"}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "10px",
                    fontSize: "0.85rem",
                    color: "#6b7280",
                    cursor: "pointer",
                  }}
                >
                  <IconInfoCircle size={20} stroke={1.5} />
                </span>
              </Tooltip>

              <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
                Model:
              </span>
              <span style={{ marginLeft: "0.5em", color: "#333" }}>
                OORB-CHAT
              </span>
              <div
                style={{
                  color: "#6b7280",
                  fontSize: "0.85rem",
                }}
              >
                {/* <Tooltip label="Context Window">
                  <span style={{ marginLeft: "10px" }}>128K</span>
                </Tooltip> */}
                <Tooltip label="Knowledge Cutoff">
                  <span style={{ marginLeft: "15px" }}>
                    {new Date().toJSON().slice(0, 10)}
                  </span>
                </Tooltip>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Scrollable chat content */}
      <div
        id="chat-container"
        ref={chatDivRef}
        onScroll={handleScroll}
        style={{
          flexGrow: 1,
          overflowY: "auto", // Chat content scrolls independently
          padding: "1em",
        }}
      >
        {chatBlocks.map((block, index) => (
          <ChatBlock
            key={`chat-block-${block.id}`}
            block={block}
            loading={index === chatBlocks.length - 1 && loading}
            isLastBlock={index === chatBlocks.length - 1}
          />
        ))}
        <div></div>
      </div>
    </div>
  );
};

export default Chat;
