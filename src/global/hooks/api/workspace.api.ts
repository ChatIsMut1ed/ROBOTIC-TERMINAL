import axiosClient from "@/global/lib/axiosClient";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface FetchFolderTreeResponse {
  label: string;
  value: string;
  type: "file" | "directory";
  extension?: string;
  children?: FetchFolderTreeResponse[];
}
const fetchFolderTree = async (): Promise<FetchFolderTreeResponse[]> => {
  const parsed = await axiosClient.get(`directory-tree`);
  return parsed.data; // This should be an array of folder structures
};

const useGetFolderTreeModels = (): UseQueryResult<
  FetchFolderTreeResponse[],
  Error
> =>
  useQuery<FetchFolderTreeResponse[], Error>({
    queryKey: ["directory-tree"],
    queryFn: fetchFolderTree,
  });

export { useGetFolderTreeModels };
