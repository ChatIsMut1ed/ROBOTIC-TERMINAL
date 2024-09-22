/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconFolder, IconFolderOpen } from "@tabler/icons-react";
import {
  Group,
  Tree,
  Loader,
  RenderTreeNodePayload,
  TreeNodeData,
} from "@mantine/core";
import { CssIcon, NpmIcon, TypeScriptCircleIcon } from "@mantinex/dev-icons";
import classes from "./css/FolderTree.module.css"; // Import the API hook
import { useGetFolderTreeModels } from "@/global/hooks/api/workspace.api";

// Icon component based on file type or folder
interface FileIconProps {
  extension?: string;
  type: string;
  expanded: boolean;
}

function FileIcon({ extension, type, expanded }: FileIconProps) {
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

const FolderTree = () => {
  const { data: folderTreeData, isLoading, error } = useGetFolderTreeModels();

  if (isLoading) return <Loader />; // Display a loader while fetching
  if (error) return <p>Error loading folder tree</p>; // Handle error state

  // Function to map API response to TreeNodeData structure
  const mapDataToTreeNode = (node: any): TreeNodeData => ({
    label: node.label,
    value: node.value,
    children: node.children?.map(mapDataToTreeNode), // recursively map children
    nodeProps: {
      type: node.type,
      extension: node.extension,
    },
  });

  // Transform the folderTreeData to match TreeNodeData structure
  const transformedData = folderTreeData?.map(mapDataToTreeNode);

  // Render each leaf in the tree (files/folders)
  function Leaf({ node, expanded, elementProps }: RenderTreeNodePayload) {
    const { type, extension } = node.nodeProps as {
      type: string;
      extension?: string;
    };

    return (
      <Group gap={5} {...elementProps}>
        <FileIcon type={type} extension={extension} expanded={expanded} />
        <span>{node.label}</span>
      </Group>
    );
  }

  return (
    <>
      {transformedData?.length ? (
        <Tree
          classNames={classes}
          selectOnClick
          clearSelectionOnOutsideClick
          data={transformedData}
          renderNode={(payload) => <Leaf {...payload} />}
        />
      ) : null}
    </>
  );
};

export default FolderTree;
