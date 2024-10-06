// src/components/VaseExampleMesh.tsx
import React, { useRef, useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import { BufferGeometry } from "three";
import { syncFaces, syncLines } from "replicad-threejs-helper";
import { CadWorkerApi } from "@/global/types/Replicad";
import { wrap } from "comlink";
import cadWorker from "@/global/lib/replicad/worker.js?worker";

const cad = wrap<CadWorkerApi>(new cadWorker());

const VaseExampleMesh: React.FC = () => {
  const { invalidate } = useThree();
  const body = useRef(new BufferGeometry());
  const lines = useRef(new BufferGeometry());

  useLayoutEffect(() => {
    const params = {
      height: 100,
      baseWidth: 20,
      wallThickness: 5,
      lowerCircleRadius: 1.5,
      lowerCirclePosition: 0.25,
      higherCircleRadius: 0.75,
      higherCirclePosition: 0.75,
      topRadius: 0.9,
      topFillet: true,
      bottomHeavy: true,
    };

    cad.createVaseMesh(params).then(({ faces, edges }) => {
      syncFaces(body.current, faces);
      syncLines(lines.current, edges);
      invalidate();
    });

    return () => {
      body.current.dispose();
      lines.current.dispose();
      invalidate();
    };
  }, [invalidate, cad]);

  return (
    <group>
      <mesh geometry={body.current}>
        <meshStandardMaterial
          color="#5a8296"
          polygonOffset
          polygonOffsetFactor={2.0}
          polygonOffsetUnits={1.0}
        />
      </mesh>
      <lineSegments geometry={lines.current}>
        <lineBasicMaterial color="#3c5a6e" />
      </lineSegments>
    </group>
  );
};

export default VaseExampleMesh;
