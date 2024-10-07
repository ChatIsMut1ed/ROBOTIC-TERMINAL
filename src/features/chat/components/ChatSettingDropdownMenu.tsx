import { ChatSettings } from "@/global/types/chat/ChatSettings";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConversationService from "../services/ConversationService";
import { NotificationService } from "../services/NotificationService";
import {
  deleteChatSetting,
  updateShowInSidebar,
} from "../services/ChatSettingsDB";
import { List } from "@mantine/core";
import {
  IconChevronDown,
  IconEye,
  IconEyeCog,
  IconInfoCircle,
  IconPaperBag,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";

interface ChatSettingDropdownMenuProps {
  chatSetting: ChatSettings | undefined;
  showTitle?: boolean;
  showDelete?: boolean;
  className?: string;
  alignRight?: boolean;
}

const ChatSettingDropdownMenu: React.FC<ChatSettingDropdownMenuProps> = ({
  chatSetting,
  showTitle = true,
  showDelete = false,
  className,
  alignRight = false,
}) => {
  const navigate = useNavigate();

  const onEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    navigate("/custom/editor/" + chatSetting?.id);
  };

  const onAbout = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
  };

  const onDuplicate = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    if (chatSetting) {
      const newChatSetting = {
        ...chatSetting,
        id: 0,
        name: `${chatSetting.name} (Copy)`,
        author: "user",
      };
      navigate("/custom/editor/", {
        state: { initialChatSetting: newChatSetting },
      });
    }
  };

  const performDeleteChatSetting = async (gid: number) => {
    try {
      if (gid > 0) {
        try {
          await ConversationService.deleteConversationsByGid(gid);
        } catch (error) {
          console.error("Failed to delete related conversations:", error);
          NotificationService.handleError(
            "Failed to delete related conversations. Please try again."
          );
          return;
        }
      }

      try {
        await deleteChatSetting(gid);
      } catch (error) {
        console.error("Failed to delete chat setting:", error);
        NotificationService.handleError(
          "Failed to delete chat setting. Please try again."
        );
      }
    } catch (error) {
      console.error("Error during deletion process::", error);
      if (error instanceof Error) {
        NotificationService.handleUnexpectedError(
          error,
          "Failed to delete all conversations"
        );
      } else {
        NotificationService.handleUnexpectedError(
          new Error("An unknown error occurred"),
          "Failed to delete all conversations"
        );
      }
    }
  };

  const onDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (chatSetting) {
      const gid = chatSetting.id;
      const conversationCount =
        await ConversationService.countConversationsByGid(gid);

      if (conversationCount > 0 && gid > 0) {
        console.log("Nice try diddy");
      } else {
        performDeleteChatSetting(gid);
      }
    }
  };

  const onHideFromSidebar = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (chatSetting) {
      await updateShowInSidebar(chatSetting.id, 0);
    }
  };

  const toggleInSidebar = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (chatSetting) {
      const newShowInSidebar = chatSetting.showInSidebar === 1 ? 0 : 1;
      await updateShowInSidebar(chatSetting.id, newShowInSidebar);
    }
  };

  return (
    <Fragment>
      <div onClick={(event) => event.stopPropagation()}>
        <List>
          <>
            <List.Item
              style={{ paddingTop: ".625rem", paddingBottom: ".625rem" }}
            >
              <span>{showTitle && chatSetting ? chatSetting.name : ""}</span>
              <IconChevronDown aria-hidden="true" />
            </List.Item>

            <div>
              <button
                onClick={() =>
                  navigate(`/g/${chatSetting?.id}`, {
                    state: { reset: Date.now() },
                  })
                }
              >
                <IconPencil aria-hidden="true" />
                New Chat
              </button>

              <button onClick={onAbout}>
                <IconInfoCircle aria-hidden="true" />
                menu-about
              </button>

              <button
                onClick={onEdit}
                disabled={chatSetting?.author === "system"}
                aria-disabled={chatSetting?.author === "system"}
              >
                <IconEyeCog aria-hidden="true" />
                menu-edit
              </button>

              <button onClick={onDuplicate}>
                <IconPaperBag aria-hidden="true" />
                menu-duplicate
              </button>

              <button onClick={toggleInSidebar}>
                {chatSetting?.showInSidebar === 1 ? (
                  <IconEye aria-hidden="true" />
                ) : (
                  <IconEyeCog aria-hidden="true" />
                )}
                {chatSetting?.showInSidebar === 1
                  ? "hide-sidebar"
                  : "show-sidebar"}
              </button>

              {showDelete && (
                <button
                  onClick={onDelete}
                  disabled={chatSetting?.author === "system"}
                >
                  <IconTrash aria-hidden="true" />
                  menu-delete
                </button>
              )}
            </div>
          </>
        </List>
      </div>
    </Fragment>
  );
};

export default ChatSettingDropdownMenu;
