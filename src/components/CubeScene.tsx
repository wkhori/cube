import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { useCubeState } from "../hooks/useCubeState";
import { Direction, Face } from "../types/cubeTypes";
import CubeComponent3D from "./CubeComponent3D";
import CubeControls from "./CubeControls";

const CubeScene: React.FC = () => {
  const { handleRotate, getCubeletColors, resetCube, randomizeCube } =
    useCubeState();

  const handleButtonClick = (face: Face, direction: Direction) => {
    handleRotate(face, direction);
  };

  return (
    <div className="flex flex-col items-center">
      <Canvas style={{ height: 500, width: 500 }}>
        <ambientLight intensity={1} />
        <pointLight position={[100, 10, 10]} />
        <PerspectiveCamera makeDefault position={[10, 10, 10]} />
        <CubeComponent3D getCubeletColors={getCubeletColors} />
        <OrbitControls
          minDistance={15}
          maxDistance={15}
          target={[0, 0, 0]}
          enablePan={false}
        />
        <Environment preset="city" />
      </Canvas>
      <CubeControls
        onRotate={handleButtonClick}
        resetCube={resetCube}
        randomizeCube={randomizeCube}
      />
    </div>
  );
};

export default CubeScene;
