interface SystemInfo {
  platform: string;
  version: string;
  architecture: string;
  hostname: string;
  totalMemory: number;
  freeMemory: number;
  numberOfCPUs: number;
}

export interface VPSInfoResponse {
  systemInfo: SystemInfo;
  distribution: string;
}
