import { useState } from 'react';
import { Color, Direction, Face, faceAdjacencyMap, faceEdgeIndicesMap } from '../types/cubeTypes';

type CubeState = Record<Face, Color[]>;

const initialCubeState: CubeState = {
  [Face.Up]: Array(9).fill(Color.White),
  [Face.Down]: Array(9).fill(Color.Yellow),
  [Face.Front]: Array(9).fill(Color.Green),
  [Face.Back]: Array(9).fill(Color.Blue),
  [Face.Left]: Array(9).fill(Color.Orange),
  [Face.Right]: Array(9).fill(Color.Red),
};

export const useCubeState = () => {
  const [cubeState, setCubeState] = useState<CubeState>(initialCubeState);

  const getCubeletColors = (position: [number, number, number]): Color[] => {
    const colors: Color[] = Array(6).fill(Color.Black);
    if (position[0] === 1) colors[0] = cubeState[Face.Right][getIndex(position, Face.Right)];
    if (position[0] === -1) colors[1] = cubeState[Face.Left][getIndex(position, Face.Left)];
    if (position[1] === 1) colors[2] = cubeState[Face.Up][getIndex(position, Face.Up)];
    if (position[1] === -1) colors[3] = cubeState[Face.Down][getIndex(position, Face.Down)];
    if (position[2] === 1) colors[4] = cubeState[Face.Front][getIndex(position, Face.Front)];
    if (position[2] === -1) colors[5] = cubeState[Face.Back][getIndex(position, Face.Back)];
    return colors;
  };

  const getIndex = (position: [number, number, number], face: Face): number => {
    switch (face) {
      case Face.Right:
      case Face.Left:
        return (1 - position[1]) * 3 + (1 - position[2]);
      case Face.Up:
      case Face.Down:
        return (1 - position[0]) * 3 + (1 - position[2]);
      case Face.Front:
      case Face.Back:
        return (1 - position[0]) * 3 + (1 - position[1]);
      default:
        return 4; // Center
    }
  };

  const rotateMatrix = (matrix: Color[], clockwise: boolean): Color[] => {
    const newMatrix = [...matrix];
    const map = clockwise ? [6, 3, 0, 7, 4, 1, 8, 5, 2] : [2, 5, 8, 1, 4, 7, 0, 3, 6];
    for (let i = 0; i < 9; i++) {
      newMatrix[i] = matrix[map[i]];
    }
    return newMatrix;
  };

  const rotateEdges = (face: Face, direction: Direction): CubeState => {
    
  
    const adjFaces = faceAdjacencyMap[face];
    const edgeIndices = faceEdgeIndicesMap[face];
    const temp = adjFaces.map((f, idx) => edgeIndices[f].map(edgeIdx => cubeState[f][edgeIdx]));
  
    const newCubeState = { ...cubeState };
  
    adjFaces.forEach((f, idx) => {
      edgeIndices[f].forEach((edgeIdx, i) => {
        newCubeState[f][edgeIdx] = temp[(idx + (direction === Direction.Clockwise ? 3 : 1)) % 4][i];
      });
    });
  
    console.log(newCubeState);
    return newCubeState;
  };
  
  const handleRotate = (face: Face, direction: Direction) => {
    const newFaceColors = rotateMatrix(cubeState[face], direction === Direction.Clockwise);
    const newCubeState = rotateEdges(face, direction);
    setCubeState({ ...newCubeState, [face]: newFaceColors });
  };

  return { cubeState, handleRotate, getCubeletColors };
};
