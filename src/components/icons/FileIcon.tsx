import { CssIcon, NpmIcon, TypeScriptCircleIcon } from "@mantinex/dev-icons";
import { IconFolder, IconFolderOpen } from "@tabler/icons-react";

interface FileIconProps {
  extension?: string; // Optional to handle files without extensions
  type: string; // Either "file" or "directory"
  expanded: boolean; // Indicates if the directory is expanded
}

export default function FileIcon({ extension, type, expanded }: FileIconProps) {
  if (type === "file") {
    // Check the extension and return the corresponding icon
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
        // Here you can also implement a default icon if necessary
        return <NpmIcon size={14} />;
    }
  }

  // If the type is a directory, show the folder icon based on expanded state
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

  return null; // Default case, returns null if no conditions match
}
