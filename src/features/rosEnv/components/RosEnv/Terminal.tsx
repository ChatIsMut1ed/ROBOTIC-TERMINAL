import { ActionIcon, Box, Group, Paper, ThemeIcon, Title } from "@mantine/core";
import {
  IconDotsVertical,
  IconPlayerPlay,
  IconPlayerPlayFilled,
  IconPlayerStop,
  IconPlayerStopFilled,
  IconTerminal,
} from "@tabler/icons-react";
import classes from "../../css/RosEnvOverview.module.css";
import { ReactTerminal } from "react-terminal";

// Define types for the commands
type CommandFunction = (args: string) => string;
type Commands = {
  [key: string]: string | CommandFunction;
};

const Terminal = () => {
  const commands: Commands = {
    whoami: "jackharper",
    cd: (directory: string) => `changed path to ${directory}`,
    help: () => "Available commands: whoami, cd <directory>",
  };

  const handleCommand = (command: string) => {
    // Only process command if it's not empty and hasn't been processed already
    if (command) {
      return commands[command] || "Command not found!";
    }
    return "";
  };

  return (
    <Paper withBorder>
      <Box
        className={classes.terminalHeader}
        p={"xs"}
        style={{ height: "500px" }}
      >
        <Group mb={"md"} justify="space-between">
          <Group gap={"md"}>
            <ThemeIcon variant="default" size="xl">
              <IconTerminal size={24} stroke={1.5} />
            </ThemeIcon>
            <Title order={2}>Terminal</Title>
          </Group>
          <Group gap={"xs"}>
            <ActionIcon variant="default" size="xl">
              <IconPlayerPlayFilled size={24} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="default" size="xl">
              <IconPlayerStopFilled size={24} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="default" size="xl">
              <IconDotsVertical size={24} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Group>
        <div className={classes.terminalContainer}>
          <ReactTerminal
            commands={commands}
            themes={{
              "vs-code-theme": {
                themeBGColor: "#1e1e1e",
                themeToolbarColor: "#1e1e1e",
                themeColor: "#FFFEFC",
                themePromptColor: "#3da5f5",
              },
            }}
            theme="vs-code-theme"
            welcomeMessage="C:\Users\ChillyOuty"
            prompt=">_"
            errorMessage="Command not found!"
            showControlButtons={false}
            showControlBar={false}
            onCommand={handleCommand}
          />
        </div>
      </Box>
    </Paper>
  );
};

export default Terminal;
