/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

import { IconCheck, IconClipboard } from "@tabler/icons-react";
import { Tooltip } from "@mantine/core";
export enum CopyButtonMode {
  Normal = "normal",
  Compact = "compact",
}

interface CopyButtonProps {
  text: string;
  mode?: CopyButtonMode;
  className?: string;
}

const CopyButton = ({
  text,
  mode = CopyButtonMode.Normal,
  className = "",
}: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let timeoutId: any = null;

    if (isCopied) {
      timeoutId = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isCopied]);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);

    if (mode === CopyButtonMode.Compact) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  const shouldWrapInTooltip = mode !== CopyButtonMode.Normal;
  const buttonContent = (
    <>
      {isCopied ? (
        <>
          <IconCheck size={24} />
          {mode === CopyButtonMode.Normal && <span>{"copied"}</span>}
        </>
      ) : (
        <>
          <IconClipboard size={24} />
          {mode === CopyButtonMode.Normal && <span>{"copy-code"}</span>}
        </>
      )}
    </>
  );
  return shouldWrapInTooltip ? (
    <Tooltip label={"copy-button"}>
      <button
        className={`chat-action-button text-gray-400 inline-flex items-center justify-center p-2 ml-auto gap-2 ${className}`}
        onClick={handleCopyClick}
      >
        {buttonContent}
      </button>
    </Tooltip>
  ) : (
    <button
      className={`chat-action-button text-gray-400 inline-flex items-center justify-center p-2 ml-auto gap-2 ${className}`}
      onClick={handleCopyClick}
    >
      {buttonContent}
    </button>
  );
};

export default CopyButton;
