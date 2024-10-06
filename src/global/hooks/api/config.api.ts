import axiosClient from "@/global/lib/axiosClient";
import { VPSInfoResponse } from "@/global/types/Config";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const fetchConfig = async (): Promise<VPSInfoResponse> => {
  const parsed = await axiosClient.get(`vps-info`);
  return parsed.data;
};

const useGetConfig = (): UseQueryResult<VPSInfoResponse, Error> =>
  useQuery<VPSInfoResponse, Error>({
    queryKey: ["vps-info"],
    queryFn: fetchConfig,
  });

export { useGetConfig };
