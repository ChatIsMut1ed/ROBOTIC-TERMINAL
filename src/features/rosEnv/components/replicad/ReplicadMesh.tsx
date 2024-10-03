import React, { useRef, useLayoutEffect, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { BufferGeometry } from "three";
import {
  syncFaces,
  syncLines,
  syncLinesFromFaces,
} from "replicad-threejs-helper";
import { ReplicadMeshProps } from "@/global/types/Replicad";

// Define the component with props
const ReplicadMesh: React.FC<ReplicadMeshProps> = React.memo(
  function ShapeMeshes({ faces, edges }) {
    const { invalidate } = useThree();

    const body = useRef(new BufferGeometry());
    const lines = useRef(new BufferGeometry());

    useLayoutEffect(() => {
      // Synchronise the buffer geometry with the new data from the parameters
      if (faces) syncFaces(body.current, faces);

      if (edges) syncLines(lines.current, edges);
      else if (faces) syncLinesFromFaces(lines.current, body.current);

      // Invalidate to recompute the canvas
      invalidate();
    }, [faces, edges, invalidate]);

    useEffect(
      () => () => {
        body.current.dispose();
        lines.current.dispose();
        invalidate();
      },
      [invalidate]
    );

    return (
      <group>
        <mesh geometry={body.current}>
          {/* Avoid z-fighting between the mesh and the lines */}
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
  }
);

export default ReplicadMesh;
