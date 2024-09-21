import React, { useState, useEffect, useRef } from "react";
import { Box, ScrollArea, Text, TextInput, Loader } from "@mantine/core";
import { Socket } from "socket.io-client";
import classes from "../../css/CustomTerminal.module.css"; // Reuse CSS here

const CustomTerminal = ({ socket }: { socket: Socket | null }) => {
  const [command, setCommand] = useState(""); // Input state
  const [terminalOutput, setTerminalOutput] = useState<
    { text: string; isCommand: boolean }[]
  >([]); // Terminal output state
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const inputRef = useRef<HTMLInputElement | null>(null); // Ref for the input
  const viewport = useRef<HTMLDivElement>(null); // Ref for the viewport

  // Initialize terminal output with a welcome message
  useEffect(() => {
    setTerminalOutput((prevOutput) => [
      ...prevOutput,
      {
        text: "Welcome to the terminal! Type your command below.",
        isCommand: false,
      },
    ]);
  }, []);

  // Listen for server output
  useEffect(() => {
    if (socket) {
      socket.on("command-output", (data: string) => {
        setTerminalOutput((prevOutput) => [
          ...prevOutput,
          { text: data, isCommand: false },
        ]);
        setIsLoading(false); // Stop loading when data is received
        // Focus input again after receiving data
        inputRef.current?.focus();
      });
    }

    return () => {
      if (socket) socket.off("command-output");
    };
  }, [socket]);

  // Scroll to the bottom whenever terminalOutput changes
  useEffect(() => {
    if (viewport.current) {
      viewport.current.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [terminalOutput]);

  // Handle command submission
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (socket && command.trim()) {
      if (command.trim().toLowerCase() === "clear") {
        // Clear the terminal output without sending to socket
        setTerminalOutput([]);
      } else {
        // Set loading state and send the command to the server
        setIsLoading(true);
        socket.emit("execute-command", command);

        // Add the entered command to the terminal output
        setTerminalOutput((prevOutput) => [
          ...prevOutput,
          { text: `> ${command}`, isCommand: true }, // Mark command
        ]);
      }

      // Clear the input field
      setCommand("");
    }
  };

  return (
    <Box className={classes.terminalWrapper}>
      <ScrollArea
        className={classes.outputContainer}
        viewportRef={viewport}
        style={{ height: "350px" }}
      >
        <div className={classes.output}>
          {terminalOutput.map((line, index) => (
            <div
              key={index}
              className={`${classes.terminalLine} ${
                line.isCommand ? classes.command : classes.response
              }`}
            >
              <Text className={classes.lineText}>{line.text}</Text>
            </div>
          ))}
          {isLoading && (
            <div className={classes.terminalLine}>
              <Loader size="sm" color="cyan" /> {/* Loading indicator */}
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleCommandSubmit} className={classes.inputForm}>
        <TextInput
          placeholder="Type a command..."
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          autoComplete="off"
          variant="unstyled"
          classNames={{ input: classes.terminalInput }}
          ref={inputRef}
        />
      </form>
    </Box>
  );
};

export default CustomTerminal;
