import { Canvas } from '@react-three/fiber';
import React from 'react';

interface FaceProps {
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
}

const Face: React.FC<FaceProps> = ({ color, position, rotation }) => (
  <mesh position={position} rotation={rotation}>
    <planeGeometry args={[1, 1]} />
    <meshStandardMaterial color={color} />
  </mesh>
);

const RubiksCube: React.FC = () => {
  return (
    <Canvas style={{ height: '100vh' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Face color="red" position={[0, 0, 0.5]} rotation={[0, 0, 0]} />
      <Face color="blue" position={[0.5, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Face color="green" position={[-0.5, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <Face color="yellow" position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <Face color="white" position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <Face color="orange" position={[0, 0, -0.5]} rotation={[0, Math.PI, 0]} />
    </Canvas>
  );
};

export default RubiksCube;