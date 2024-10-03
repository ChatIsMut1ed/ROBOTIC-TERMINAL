import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { ThreeContextProps } from "@/global/types/Replicad";

THREE.Object3D.DEFAULT_UP.set(0, 0, 1);

const ThreeContext: React.FC<ThreeContextProps> = ({ children, ...props }) => {
  const dpr = Math.min(window.devicePixelRatio, 2);

  return (
    <Suspense fallback={null}>
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#f5f5f5",
        }}
        dpr={dpr}
        frameloop="demand"
        camera={{ position: [20, 40, 50] }}
        {...props}
      >
        <OrbitControls />
        <ambientLight intensity={4} />
        <pointLight position={[100, 100, 100]} />
        {children}
      </Canvas>
    </Suspense>
  );
};

export default ThreeContext;
