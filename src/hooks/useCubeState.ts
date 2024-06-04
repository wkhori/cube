import { useState } from "react";
import {
  Color,
  Direction,
  Face,
  faceAdjacencyMap,
  faceEdgeIndicesMap,
  faceIndices,
} from "../types/cubeTypes";

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

  const _getIndex = (
    position: [number, number, number],
    face: Face
  ): number => {
    return faceIndices[face](position);
  };

  const _rotateFace = (matrix: Color[], clockwise: boolean): Color[] => {
    const newMatrix = [...matrix];
    const map = clockwise
      ? [6, 3, 0, 7, 4, 1, 8, 5, 2]
      : [2, 5, 8, 1, 4, 7, 0, 3, 6];
    for (let i = 0; i < 9; i++) {
      newMatrix[i] = matrix[map[i]];
    }
    return newMatrix;
  };

  const _rotateAdjacentEdges = (
    face: Face,
    direction: Direction
  ): CubeState => {
    const adjFaces = faceAdjacencyMap[face];
    const edgeIndices = faceEdgeIndicesMap[face];
    const temp = adjFaces.map((f, idx) =>
      edgeIndices[f].map((edgeIdx) => cubeState[f][edgeIdx])
    );

    const newCubeState = { ...cubeState };

    adjFaces.forEach((f, idx) => {
      edgeIndices[f].forEach((edgeIdx, i) => {
        newCubeState[f][edgeIdx] =
          temp[(idx + (direction === Direction.Clockwise ? 3 : 1)) % 4][i];
      });
    });

    return newCubeState;
  };

  const getCubeletColors = (position: [number, number, number]): Color[] => {
    const colors: Color[] = Array(6).fill(Color.Black);

    const faceColorMapping: { [key: number]: Face } = {
      0: Face.Right,
      1: Face.Left,
      2: Face.Up,
      3: Face.Down,
      4: Face.Front,
      5: Face.Back,
    };

    const facePositionMapping: { [key: number]: number } = {
      0: position[0],
      1: -position[0],
      2: position[1],
      3: -position[1],
      4: position[2],
      5: -position[2],
    };

    Object.keys(faceColorMapping).forEach((key) => {
      const index = Number(key);
      if (facePositionMapping[index] === 1) {
        colors[index] =
          cubeState[faceColorMapping[index]][
            _getIndex(position, faceColorMapping[index])
          ];
      }
    });

    return colors;
  };

  const handleRotate = (face: Face, direction: Direction) => {
    const newFaceColors = _rotateFace(
      cubeState[face],
      direction === Direction.Clockwise
    );
    const newCubeState = _rotateAdjacentEdges(face, direction);
    setCubeState({ ...newCubeState, [face]: newFaceColors });
  };

  return { cubeState, handleRotate, getCubeletColors };
};
