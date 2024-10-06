/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export interface ReplicadMeshProps {
  edges: any;
  faces: any;
}

export interface CadWorkerApi {
  createBlob(thickness: number): Promise<Blob>;
  createMesh(thickness: number): Promise<{ faces: any; edges: any }>;
  createVaseMesh(params: {
    height?: number;
    baseWidth?: number;
    wallThickness?: number;
    lowerCircleRadius?: number;
    lowerCirclePosition?: number;
    higherCircleRadius?: number;
    higherCirclePosition?: number;
    topRadius?: number;
    topFillet?: boolean;
    bottomHeavy?: boolean;
  }): Promise<{ faces: any; edges: any }>;
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

export type VaseParams = {
  height: number;
  baseWidth: number;
  wallThickness: number;
  lowerCircleRadius: number;
  lowerCirclePosition: number;
  higherCircleRadius: number;
  higherCirclePosition: number;
  topRadius: number;
  topFillet: boolean;
  bottomHeavy: boolean;
};
