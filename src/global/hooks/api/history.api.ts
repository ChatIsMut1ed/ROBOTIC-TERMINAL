import axiosClient from "@/global/lib/axiosClient";
import { CommandHistoryResponse } from "@/global/types/History";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const fetchCommandHistory = async (): Promise<CommandHistoryResponse> => {
  const parsed = await axiosClient.get(`command-history`);
  return parsed.data;
};

const useGetCommandHistory = (): UseQueryResult<
  CommandHistoryResponse,
  Error
> =>
  useQuery<CommandHistoryResponse, Error>({
    queryKey: ["command-history"],
    queryFn: fetchCommandHistory,
  });

export { useGetCommandHistory };
