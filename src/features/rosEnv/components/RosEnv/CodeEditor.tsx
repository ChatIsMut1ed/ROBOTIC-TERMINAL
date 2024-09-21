import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
import { useEffect, useRef, useState } from "react";
import { Box, Group, Paper, ThemeIcon, Title } from "@mantine/core";
import { IconBracketsAngle } from "@tabler/icons-react";
import classes from "../../css/RosEnvOverview.module.css";
import files from "./data/files";
import Editor from "@monaco-editor/react";
import FolderTree from "../folderTree/FolderTree";

// Define the keys of the files object
type FileName = "script.js" | "style.css" | "index.html";

const CodeEditor = () => {
  const [fileName, setFileName] = useState<FileName>("script.js");
  const file = files[fileName];
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(
    null
  );

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
          <FolderTree />
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
            path={file.name}
            defaultLanguage={file.language}
            defaultValue={file.value}
            onMount={(editor) => (editorRef.current = editor)}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default CodeEditor;
