/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/global/lib/axiosClient";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

export interface FetchFolderTreeResponse {
  label: string;
  value: string;
  type: "file" | "directory";
  extension?: string;
  children?: FetchFolderTreeResponse[];
}

// Function to fetch the folder tree
const fetchFolderTree = async (): Promise<FetchFolderTreeResponse[]> => {
  const parsed = await axiosClient.get(`directory-tree`);
  return parsed.data; // This should be an array of folder structures
};

// Custom hook for fetching the folder tree
const useGetFolderTreeModels = (): UseQueryResult<
  FetchFolderTreeResponse[],
  Error
> =>
  useQuery<FetchFolderTreeResponse[], Error>({
    queryKey: ["directory-tree"],
    queryFn: fetchFolderTree,
  });

// Interface for file content response
export interface FetchFileContentResponse {
  content: string;
}

// Function to fetch file content
const fetchFileContent = async (
  filePath: string
): Promise<FetchFileContentResponse> => {
  const response = await axiosClient.get(`file`, {
    params: { path: filePath },
  });
  return { content: response.data }; // Return content as a property
};

// Custom hook for fetching file content
const useGetFileContent = (
  filePath: string
): UseQueryResult<FetchFileContentResponse, Error> => {
  return useQuery<FetchFileContentResponse, Error>({
    queryKey: ["file-content", filePath], // Unique key based on file path
    queryFn: () => fetchFileContent(filePath),
    enabled: !!filePath, // Only run the query if filePath is provided
  });
};

const saveFileContent = async (
  filePath: string,
  content: string
): Promise<string> => {
  const response = await axiosClient.post(`save-file`, {
    path: filePath,
    content: content,
  });
  return response.data;
};

const useSaveFileContent = (): UseMutationResult<
  string,
  Error,
  { filePath: string; content: string },
  unknown
> => {
  const mutationConfig: UseMutationOptions<
    string,
    Error,
    { filePath: string; content: string },
    unknown
  > = {
    mutationFn: ({ filePath, content }) => saveFileContent(filePath, content),
  };

  return useMutation(mutationConfig);
};

export { useGetFolderTreeModels, useGetFileContent, useSaveFileContent };
