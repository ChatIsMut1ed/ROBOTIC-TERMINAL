/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Group,
  Tree,
  Loader,
  RenderTreeNodePayload,
  TreeNodeData,
} from "@mantine/core";
import classes from "./css/FolderTree.module.css"; // Import the API hook
import { useGetFolderTreeModels } from "@/global/hooks/api/workspace.api";
import FileIcon from "@/components/icons/FileIcon";

interface FolderTreeProps {
  onFileSelect: (filePath: string, content: string) => void;
}

const FolderTree: React.FC<FolderTreeProps> = ({ onFileSelect }) => {
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

  // Handle file click
  const handleFileClick = async (filePath: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SOCKET_URL}file?path=${encodeURIComponent(
          filePath
        )}`
      );
      const content = await response.text(); // Fetch file content as text
      onFileSelect(filePath, content); // Pass content to parent
    } catch (error) {
      console.error("Error fetching file content:", error);
    }
  };

  // Render each leaf in the tree (files/folders)
  function Leaf({ node, expanded, elementProps }: RenderTreeNodePayload) {
    const { type, extension } = node.nodeProps as {
      type: string;
      extension?: string;
    };

    return (
      <Group
        gap={5}
        {...elementProps}
        onClick={() => {
          if (type === "file") {
            handleFileClick(node.value); // Trigger file selection on file click
          }
        }}
      >
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
