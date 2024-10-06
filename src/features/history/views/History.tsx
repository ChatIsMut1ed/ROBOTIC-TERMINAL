import { useState } from "react";
import { useGetCommandHistory } from "@/global/hooks/api/history.api";
import { Box, Text, Stack, Loader, Pagination, Group } from "@mantine/core";

const History = () => {
  const { data, isLoading, isError } = useGetCommandHistory();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // Calculate total pages based on the length of latestCommands
  const totalCommands = data?.latestCommands?.length || 0;
  const totalPages = Math.ceil(totalCommands / itemsPerPage);

  // Calculate the commands to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCommands = data?.latestCommands?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <Box
      p="md"
      style={{
        backgroundColor: "white",
      }}
    >
      <Text size="xl" w={700}>
        Latest Command History
      </Text>
      {isLoading && <Loader />}
      {isError && (
        <Text c="red" size="sm">
          Failed to fetch command history. Please check if the server is running
          and reachable.
        </Text>
      )}
      {!isLoading && !isError && totalCommands === 0 && (
        <Text size="sm">No commands found or the history file is empty.</Text>
      )}
      {currentCommands && currentCommands.length > 0 && (
        <Stack gap="xs" mt="md">
          {currentCommands.map((command, index) => (
            <Box
              key={index + startIndex}
              p="xs"
              style={{
                background: "#f4f4f4",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontFamily: "Courier, monospace",
              }}
            >
              <Text>
                {startIndex + index + 1}. {command}
              </Text>
            </Box>
          ))}
        </Stack>
      )}
      <Group justify="flex-end">
        {totalPages > 1 && (
          <Pagination
            value={currentPage}
            onChange={setCurrentPage}
            total={totalPages}
            mt="md"
          />
        )}
      </Group>
    </Box>
  );
};

export default History;
