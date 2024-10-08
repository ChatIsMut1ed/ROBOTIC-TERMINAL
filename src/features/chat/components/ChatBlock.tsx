/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChatMessage, MessageType } from "@/global/types/chat/ChatCompletion";
import { IconBrain, IconUser, IconUserCog } from "@tabler/icons-react";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import UserContentBlock from "./UserContentBlock";
import MarkdownBlock from "./MarkdownBlock";

interface Props {
  block: ChatMessage;
  loading: boolean;
  isLastBlock: boolean;
}

const ChatBlock: React.FC<Props> = ({ block, loading, isLastBlock }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editedBlockContent, setEditedBlockContent] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [savedHeight, setSavedHeight] = useState<string | null>(null);

  const errorStyles =
    block.messageType === MessageType.Error
      ? {
          backgroundColor: "#fce4e4",
          borderColor: "#ff5f5f",
          borderWidth: "1px",
          borderRadius: "8px",
          padding: "10px",
        }
      : {};

  useEffect(() => {
    if (isEdit) {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(0, 0);
    }
  }, [isEdit]);

  const handleEdit = () => {
    if (contentRef.current) {
      setSavedHeight(`${contentRef.current.offsetHeight}px`);
    }
    setIsEdit(true);
    setEditedBlockContent(block.content);
  };

  const handleEditSave = () => {
    setIsEdit(false);
  };

  const handleEditCancel = () => {
    setIsEdit(false);
  };

  const checkForSpecialKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEditSave();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleEditCancel();
    }
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedBlockContent(event.target.value);
  };

  return (
    <div
      key={`chat-block-${block.id}`}
      style={{
        display: "flex",
        padding: "1rem 0",
        marginBottom: "1rem",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          marginRight: "1rem",
        }}
      >
        {block.role === "user" ? (
          <IconUser size={30} style={{ paddingRight: "0.5rem" }} />
        ) : block.role === "assistant" ? (
          <IconBrain size={30} style={{ paddingRight: "0.5rem" }} />
        ) : null}
      </div>

      <div style={{ flexGrow: 1 }}>
        <div
          id={`message-block-${block.id}`}
          style={{
            ...errorStyles,
            backgroundColor: block.role === "user" ? "#f1f5f9" : "#a6f1f5",
            padding: "1rem",
            borderRadius: "10px",
            position: "relative",
            overflow: "hidden",
            wordWrap: "break-word",
          }}
        >
          {isEdit ? (
            <textarea
              spellCheck={false}
              ref={textareaRef}
              style={{
                width: "100%",
                height: savedHeight ?? "auto",
                lineHeight: "1.4",
                fontSize: "1rem",
                borderRadius: "8px",
                padding: "0.75rem",
              }}
              onChange={handleTextChange}
              onKeyDown={checkForSpecialKey}
              value={editedBlockContent}
            ></textarea>
          ) : (
            <div ref={contentRef}>
              {block.role === "user" ? (
                <UserContentBlock
                  text={block.content}
                  fileDataRef={block.fileDataRef ? block.fileDataRef : []}
                />
              ) : (
                <MarkdownBlock
                  markdown={block.content}
                  role={block.role}
                  loading={loading}
                />
              )}
            </div>
          )}
        </div>

        {/* {!isLastBlock && !loading && (
          <div id={`action-block-${block.id}`} style={{ marginTop: "0.5rem" }}>
            <button
              onClick={handleEdit}
              style={{
                fontSize: "0.85rem",
                color: "#4a5568",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "0.25rem",
                textDecoration: "underline",
              }}
            >
              Edit
            </button>
      
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ChatBlock;
