import { useState, useEffect } from "react";
import { ActionIcon, Box, Group, Paper, ThemeIcon, Title } from "@mantine/core";
import {
  IconDotsVertical,
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
  IconTerminal,
} from "@tabler/icons-react";
import { io, Socket } from "socket.io-client";
import CustomTerminal from "./CustomTerminal"; // Import your custom terminal
import classes from "../../css/RosEnvOverview.module.css";

const Terminal = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  // Establish the WebSocket connection
  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
      path: import.meta.env.VITE_SOCKET_PATH,
    });
    setSocket(newSocket);

    return () => {
      newSocket.close(); // Close socket connection when component unmounts
    };
  }, []);

  return (
    <Paper withBorder>
      <Box className={classes.terminalHeader} p={"xs"}>
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
          {/* Use your custom terminal component */}
          <CustomTerminal socket={socket} />
        </div>
      </Box>
    </Paper>
  );
};

export default Terminal;
