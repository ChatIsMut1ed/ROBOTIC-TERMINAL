import { ChatSettings } from "@/global/types/chat/ChatSettings";
import { IconCube } from "@tabler/icons-react";
import React from "react";

interface CustomChatSplashProps {
  chatSettings: ChatSettings;
  className?: string;
}

const CustomChatSplash: React.FC<CustomChatSplashProps> = ({
  chatSettings,
  className,
}) => {
  return (
    <div>
      <div>
        <div>
          <div>
            {chatSettings.icon && chatSettings.icon.data ? (
              <img src={chatSettings.icon.data} alt="" />
            ) : (
              <IconCube size={18} />
            )}
          </div>
        </div>
      </div>
      <div>
        <div>{chatSettings.name}</div>
        <div>{chatSettings.description}</div>
      </div>
    </div>
  );
};

export default CustomChatSplash;
