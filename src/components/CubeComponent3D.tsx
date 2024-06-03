import React from 'react';
import { useCubeState } from '../hooks/useCubeState';
import { Direction, Face } from '../types/cubeTypes';
import Cubelet from './Cubelet';

const CubeComponent3D: React.FC = () => {
  const { cubeState, handleRotate, getCubeletColors } = useCubeState();

  const handleDragEnd = (face: Face, direction: 'horizontal' | 'vertical') => {
    const rotationDirection = direction === 'horizontal' ? Direction.Clockwise : Direction.Counterclockwise;
    handleRotate(face, rotationDirection);
  };

  console.log(cubeState);
  return (
    <group scale={[2, 2, 2]}>
      {Object.keys(cubeState).map((face) =>
        [...Array(9).keys()].map((i) => {
          const faceKey = face as Face;
          const position = getCubeletPosition(faceKey, i);
          const cubeletColors = getCubeletColors(position);
          return (
            <Cubelet
              key={`${faceKey}-${i}`}
              position={position}
              colors={cubeletColors}
              onDragEnd={(direction) => handleDragEnd(faceKey, direction)}
            />
          );
        })
      )}
    </group>
  );
};

const getCubeletPosition = (face: Face, index: number): [number, number, number] => {
  const row = Math.floor(index / 3) - 1;
  const col = (index % 3) - 1;

  switch (face) {
    case Face.Up:
      return [col, 1, row];
    case Face.Down:
      return [col, -1, -row];
    case Face.Front:
      return [col, -row, 1];
    case Face.Back:
      return [-col, -row, -1];
    case Face.Left:
      return [-1, -row, -col];
    case Face.Right:
      return [1, -row, col];
    default:
      return [0, 0, 0];
  }
};

export default CubeComponent3D;
