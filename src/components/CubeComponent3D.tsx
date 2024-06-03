import React from 'react';
import { useCubeState } from '../hooks/useCubeState';
import { Direction, Face } from '../types/cubeTypes';
import Cubelet from './Cubelet';

const CubeComponent3D: React.FC = () => {
  const { cubeState, handleRotate } = useCubeState();

  const handleDragEnd = (face: Face, direction: 'horizontal' | 'vertical') => {
    const rotationDirection = direction === 'horizontal' ? Direction.Clockwise : Direction.Counterclockwise;
    handleRotate(face, rotationDirection);
  };

  return (
    <group>
      {[...Array(3).keys()].map((x) =>
        [...Array(3).keys()].map((y) =>
          [...Array(3).keys()].map((z) => {
            const position: [number, number, number] = [x - 1, y - 1, z - 1];
            return (
              <Cubelet
                key={`${x}-${y}-${z}`}
                position={position}
                onDragEnd={(direction) => handleDragEnd(Face.Front, direction)}
              />
            );
          })
        )
      )}
    </group>
  );
};

export default CubeComponent3D;
