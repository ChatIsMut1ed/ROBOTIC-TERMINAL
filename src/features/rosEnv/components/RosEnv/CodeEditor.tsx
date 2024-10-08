import React, { useEffect, useRef, useState } from "react";
import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
import {
  Box,
  Group,
  Paper,
  ThemeIcon,
  Title,
  Loader,
  Button,
} from "@mantine/core";
import { IconBracketsAngle, IconFile } from "@tabler/icons-react";
import classes from "../../css/RosEnvOverview.module.css";
import Editor from "@monaco-editor/react";
import FolderTree from "../folderTree/FolderTree";
import {
  useGetFolderTreeModels,
  useGetFileContent,
  useSaveFileContent, // Import the save file content hook
  FetchFolderTreeResponse,
} from "@/global/hooks/api/workspace.api"; // Import the API hooks
import { languageMapping } from "./data/fileLanguages";
import { useToast } from "@/global/lib/toast/ToastContext";

const CodeEditor = () => {
  const { showSuccess, showError } = useToast();
  const {
    data: folderTreeData,
    isLoading: isLoadingFolderTree,
    error: folderTreeError,
  } = useGetFolderTreeModels(); // Fetch folder tree data
  const saveFile = useSaveFileContent();
  const [fileName, setFileName] = useState<string>(""); // Default filename
  const [fileContent, setFileContent] = useState<string>(""); // State for editor content
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(
    null
  );

  // Fetch the content of the selected file
  const {
    data: fileContentData,
    isLoading: isLoadingFileContent,
    error: fileContentError,
  } = useGetFileContent(fileName);

  // Automatically load the first file content when folderTreeData is loaded
  useEffect(() => {
    if (folderTreeData && folderTreeData.length > 0) {
      const firstFile = findFirstFile(folderTreeData);
      if (firstFile) {
        setFileName(firstFile.value); // Set the first file's name to load its content
      }
    }
  }, [folderTreeData]);

  // Fetch file content
  useEffect(() => {
    if (fileContentData) {
      setFileContent(fileContentData.content); // Set editor content when fileContentData is loaded
    }
  }, [fileContentData]);

  // Function to find the first file in the folder tree
  const findFirstFile = (
    nodes: FetchFolderTreeResponse[]
  ): FetchFolderTreeResponse | null => {
    for (const node of nodes) {
      if (node && node.type === "file") {
        return node; // Return the first file found
      }
      if (node.children) {
        const childFile = findFirstFile(node.children); // Recurse into children
        if (childFile) return childFile; // Return found file from children
      }
    }
    return null; // No file found
  };

  // Handle file selection from the tree
  const handleFileSelect = (filePath: string) => {
    setFileName(filePath); // Set the selected file's name to load its content
  };

  // Focus the editor when the file name changes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [fileName]);

  // Function to get language based on file extension
  const getLanguage = (fileName: string): string => {
    const extension = fileName.slice(
      ((fileName.lastIndexOf(".") - 1) >>> 0) + 2
    ); // Get file extension
    return languageMapping[`.${extension}`] || "plaintext"; // Default to 'plaintext' if not found
  };

  // Save file function
  const handleSaveFile = async () => {
    if (!fileName || !fileContent) {
      console.log("error fileName  and fileContent");
      return;
    }

    try {
      await saveFile.mutateAsync({
        filePath: fileName,
        content: fileContent,
      });
      showSuccess("File saved successfully!");
    } catch (error) {
      showError("An error has occurred");
    }
  };

  // Loader or error handling
  if (isLoadingFolderTree) return <Loader />; // Show loader while fetching folder tree
  if (folderTreeError) return <p>Error loading folder tree</p>; // Show error message for folder tree
  if (isLoadingFileContent) return <Loader />; // Show loader while fetching file content
  if (fileContentError) return <p>Error loading file content</p>; // Show error message for file content

  return (
    <Paper withBorder>
      <Box className={classes.editorHeader} p={"xs"}>
        <Box className={classes.editorFolderContainer}>
          <Title order={6} mb={"md"}>
            OORB-STUDIO
          </Title>
          <FolderTree data={folderTreeData} onFileSelect={handleFileSelect} />
        </Box>
        <Box className={classes.editorContainer}>
          <Group gap={"md"} mb={"xs"} justify="space-between">
            <Group>
              <ThemeIcon variant="default" size="xl">
                <IconBracketsAngle size={24} stroke={1.5} />
              </ThemeIcon>
              <Title order={2}>Code Editor</Title>
            </Group>
            <Button
              loading={saveFile.isPending}
              onClick={handleSaveFile}
              variant="default"
              leftSection={<IconFile size={18} />}
              disabled={!fileName || !fileContent}
            >
              Save File
            </Button>
          </Group>
          <Editor
            height="50vh"
            theme="vs-dark"
            path={fileName || "Untitled"} // Default path to avoid undefined
            value={fileContent} // Use file content or default to empty string
            language={getLanguage(fileName)}
            onMount={(editor) => (editorRef.current = editor)}
            onChange={(value) => setFileContent(value || "")} // Update content on change
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default CodeEditor;
