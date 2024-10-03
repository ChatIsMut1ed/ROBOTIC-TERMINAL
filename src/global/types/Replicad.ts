/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export interface ReplicadMeshProps {
  edges: any;
  faces: any;
}

export interface CadWorkerApi {
  createBlob(thickness: number): Promise<Blob>;
  createMesh(thickness: number): Promise<{ faces: any; edges: any }>;
}

declare module "replicad-opencascadejs/src/replicad_single.js" {
  export default function opencascade(options?: {
    locateFile?: () => string;
  }): Promise<any>;
}

export interface ThreeContextProps {
  children: ReactNode;
  [key: string]: any;
}
