import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
import { useEffect, useRef, useState } from "react";
import { Box, Group, Paper, ThemeIcon, Title } from "@mantine/core";
import { IconBracketsAngle } from "@tabler/icons-react";
import classes from "../../css/RosEnvOverview.module.css";
import files from "./data/files"; // Can be replaced by API fetched content
import Editor from "@monaco-editor/react";
import FolderTree from "../folderTree/FolderTree";

const CodeEditor = () => {
  const [fileContent, setFileContent] = useState<string>(
    files["script.js"].value
  ); // Default content
  const [fileName, setFileName] = useState<string>("script.js");
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(
    null
  );

  const handleFileSelect = (filePath: string, content: string) => {
    setFileName(filePath);
    setFileContent(content);
  };

  useEffect(() => {
    editorRef.current?.focus();
  }, [fileName]);

  return (
    <Paper withBorder>
      <Box className={classes.editorHeader} p={"xs"}>
        <Box className={classes.editorFolderContainer}>
          <Title order={6} mb={"md"}>
            OORB-STUDIO
          </Title>
          <FolderTree onFileSelect={handleFileSelect} />
        </Box>
        <Box className={classes.editorContainer}>
          <Group gap={"md"} mb={"xs"}>
            <ThemeIcon variant="default" size="xl">
              <IconBracketsAngle size={24} stroke={1.5} />
            </ThemeIcon>
            <Title order={2}>Code Editor</Title>
          </Group>
          <Editor
            height="55vh"
            theme="vs-dark"
            path={fileName}
            value={fileContent} // Bind file content to editor
            language={fileName.endsWith(".js") ? "javascript" : "typescript"} // Dynamically set language
            onMount={(editor) => (editorRef.current = editor)}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default CodeEditor;
