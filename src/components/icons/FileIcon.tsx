import { CssIcon, NpmIcon, TypeScriptCircleIcon } from "@mantinex/dev-icons";
import { IconFolder, IconFolderOpen } from "@tabler/icons-react";

interface FileIconProps {
  extension?: string;
  type: string;
  expanded: boolean;
}

export default function FileIcon({ extension, type, expanded }: FileIconProps) {
  if (type === "file") {
    switch (extension) {
      case ".ts":
      case ".tsx":
      case "tsconfig.json":
        return <TypeScriptCircleIcon size={14} />;
      case ".css":
        return <CssIcon size={14} />;
      case "package.json":
        return <NpmIcon size={14} />;
      default:
        return null; // Default icon for other file types can be added here if needed
    }
  }

  if (type === "directory") {
    return expanded ? (
      <IconFolderOpen
        color="var(--mantine-color-yellow-9)"
        size={14}
        stroke={2.5}
      />
    ) : (
      <IconFolder
        color="var(--mantine-color-yellow-9)"
        size={14}
        stroke={2.5}
      />
    );
  }

  return null;
}
