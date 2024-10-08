import {
  Group,
  Tree,
  RenderTreeNodePayload,
  TreeNodeData,
} from "@mantine/core";
import { FetchFolderTreeResponse } from "@/global/hooks/api/workspace.api";
import FileIcon from "@/components/icons/FileIcon"; // Ensure this points to the right file
import classes from "./css/FolderTree.module.css"; // Import the CSS for styling

interface FolderTreeProps {
  data: FetchFolderTreeResponse[] | undefined; // Expect data to be passed in
  onFileSelect: (filePath: string, content: string) => void;
}

const FolderTree: React.FC<FolderTreeProps> = ({ data, onFileSelect }) => {
  const mapDataToTreeNode = (node: FetchFolderTreeResponse): TreeNodeData => ({
    label: node.label,
    value: node.value,
    children: node.children?.map(mapDataToTreeNode) || [], // Use an empty array if no children
    nodeProps: {
      type: node.type,
      extension: node.extension,
    },
  });

  const transformedData = data?.map(mapDataToTreeNode);

  const handleFileClick = async (filePath: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}file?path=${encodeURIComponent(
          filePath
        )}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const content = await response.text(); // Fetch file content as text
      console.log("Fetched Content:", content); // Check the actual content fetched

      // Transform content to plain text
      const transformedContent = transformToPlainText(content, filePath);

      // Pass the transformed content to the parent
      onFileSelect(filePath, transformedContent);
    } catch (error) {
      console.error("Error fetching file content:", error);
    }
  };

  // Helper function to transform content based on file type
  const transformToPlainText = (content: string, filePath: string): string => {
    if (filePath.endsWith(".json")) {
      // Optionally format JSON for better readability
      try {
        const jsonObject = JSON.parse(content);
        console.log(JSON.stringify(jsonObject, null, "\t"));
        return JSON.stringify(jsonObject, null, "\t"); // Pretty-print JSON with indentation
      } catch (error) {
        console.error("Invalid JSON format:", error);
        return content; // Return the original content if JSON parsing fails
      }
    }

    // For other types, just return the content as is
    return content;
  };

  function Leaf({
    node,
    expanded,
    hasChildren,
    elementProps,
  }: RenderTreeNodePayload) {
    const isDirectory = hasChildren;
    const isFile = !isDirectory;
    const extension = isFile ? node.value.split(".").pop() : undefined;
    const type = isDirectory ? "directory" : "file";
    const filePath = node.value; // Assuming the value is the file path

    const handleClick = (event: React.MouseEvent) => {
      if (isFile) {
        handleFileClick(filePath);
      } else {
        // This will toggle the directory when clicked
        if (elementProps.onClick) {
          elementProps.onClick(event); // Ensure it's defined
        }
      }
    };

    return (
      <Group
        gap={5}
        {...elementProps} // Keep this to allow Mantine to manage events
        onClick={handleClick} // Attach handler for files
        style={{ cursor: isDirectory ? "pointer" : "default" }} // Optional: visual feedback
      >
        <FileIcon extension={extension} type={type} expanded={expanded} />
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
