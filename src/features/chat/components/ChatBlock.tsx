import { ChatMessage, MessageType } from "@/global/types/chat/ChatCompletion";
import { IconUser, IconUserCog } from "@tabler/icons-react";
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
          backgroundColor: "#F5E6E6",
          borderColor: "red",
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

  const handleRegenerate = () => {};

  const handleEdit = () => {
    if (contentRef.current) {
      setSavedHeight(`${contentRef.current.offsetHeight}px`);
    }
    setIsEdit(true);
    setEditedBlockContent(block.content);
  };
  const handleEditSave = () => {
    // todo: notify main to change content block
    setIsEdit(false);
  };

  const handleEditCancel = () => {
    setIsEdit(false);
  };

  const checkForSpecialKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const isEnter = e.key === "Enter";
    const isEscape = e.key === "Escape";

    if (isEnter) {
      e.preventDefault();
      handleEditSave();
    } else if (isEscape) {
      e.preventDefault();
      handleEditCancel();
    }
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedBlockContent(event.target.value);
  };

  return (
    <div key={`chat-block-${block.id}`}>
      <div>
        <div>
          <div>
            <div>
              {block.role === "user" ? (
                <IconUser size={24} />
              ) : block.role === "assistant" ? (
                <IconUserCog key={`open-ai-logo-${block.id}`} />
              ) : null}
            </div>
          </div>
          <div>
            <div id={`message-block-${block.id}`} style={errorStyles}>
              <div>
                {isEdit ? (
                  <textarea
                    spellCheck={false}
                    tabIndex={0}
                    ref={textareaRef}
                    style={{
                      height: savedHeight ?? undefined,
                      lineHeight: "1.33",
                      fontSize: "1rem",
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
                      <>
                        <MarkdownBlock
                          markdown={block.content}
                          role={block.role}
                          loading={loading}
                        />
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {!(isLastBlock && loading) && (
          <div id={`action-block-${block.id}`}>
            {/* {block.role === "assistant" && (
              <TextToSpeechButton content={block.content} />
            )} */}
            {/* <div className="copy-button">
              <CopyButton mode={CopyButtonMode.Compact} text={block.content} />
            </div> */}
            {/*          {block.role === 'assistant' && (
                    <div className="regenerate-button text-gray-400 visible">
                        <button className="flex gap-2" onClick={handleRegenerate}>
                            <ArrowPathRoundedSquareIcon {...iconProps}/>
                        </button>
                    </div>
                  )}
                  <div className="regenerate-button text-gray-400 visible">
                      <button className="flex gap-2" onClick={handleEdit}>
                          <PencilSquareIcon {...iconProps}/>
                      </button>
                  </div>*/}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBlock;
