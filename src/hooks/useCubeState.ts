import { useState } from 'react';
import { Color, Direction, Face } from '../types/cubeTypes';

type CubeState = Record<Face, Color[]>;

const initialCubeState: CubeState = {
  [Face.Up]: Array(9).fill(Color.White),
  [Face.Down]: Array(9).fill(Color.Yellow),
  [Face.Left]: Array(9).fill(Color.Green),
  [Face.Right]: Array(9).fill(Color.Blue),
  [Face.Front]: Array(9).fill(Color.Red),
  [Face.Back]: Array(9).fill(Color.Orange),
};

const rotateEdges = (
  cube: CubeState,
  edges: [Face, number][],
  clockwise: boolean
) => {
  const temp = edges.map(([face, idx]) => cube[face][idx]);
  if (clockwise) {
    for (let i = 0; i < edges.length; i++) {
      const [nextFace, nextIdx] = edges[(i + 3) % 4];
      cube[nextFace][nextIdx] = temp[i];
    }
  } else {
    for (let i = 0; i < edges.length; i++) {
      const [nextFace, nextIdx] = edges[(i + 1) % 4];
      cube[nextFace][nextIdx] = temp[i];
    }
  }
};

export const useCubeState = () => {
  const [cubeState, setCubeState] = useState<CubeState>(initialCubeState);

  const handleRotate = (face: Face, direction: Direction) => {
    const newCubeState: CubeState = { ...cubeState };

    switch (face) {
      case Face.Up:
        rotateEdges(newCubeState, [[Face.Front, 0], [Face.Right, 0], [Face.Back, 0], [Face.Left, 0]], direction === Direction.Clockwise);
        rotateEdges(newCubeState, [[Face.Front, 1], [Face.Right, 1], [Face.Back, 1], [Face.Left, 1]], direction === Direction.Clockwise);
        rotateEdges(newCubeState, [[Face.Front, 2], [Face.Right, 2], [Face.Back, 2], [Face.Left, 2]], direction === Direction.Clockwise);
        break;
      case Face.Down:
        rotateEdges(newCubeState, [[Face.Front, 6], [Face.Left, 6], [Face.Back, 6], [Face.Right, 6]], direction === Direction.Clockwise);
        rotateEdges(newCubeState, [[Face.Front, 7], [Face.Left, 7], [Face.Back, 7], [Face.Right, 7]], direction === Direction.Clockwise);
        rotateEdges(newCubeState, [[Face.Front, 8], [Face.Left, 8], [Face.Back, 8], [Face.Right, 8]], direction === Direction.Clockwise);
        break;
      case Face.Front:
        rotateEdges(newCubeState, [[Face.Up, 6], [Face.Left, 2], [Face.Down, 2], [Face.Right, 6]], direction === Direction.Clockwise);
        rotateEdges(newCubeState, [[Face.Up, 7], [Face.Left, 5], [Face.Down, 1], [Face.Right, 3]], direction === Direction.Clockwise);
        rotateEdges(newCubeState, [[Face.Up, 8], [Face.Left, 8], [Face.Down, 0], [Face.Right, 0]], direction === Direction.Clockwise);
        break;
      case Face.Back:
        rotateEdges(newCubeState, [[Face.Up, 0], [Face.Right, 8], [Face.Down, 8], [Face.Left, 0]], direction === Direction.Clockwise);
        rotateEdges(newCubeState, [[Face.Up, 1], [Face.Right, 5], [Face.Down, 7], [Face.Left, 3]], direction === Direction.Clockwise);
        rotateEdges(newCubeState, [[Face.Up, 2], [Face.Right, 2], [Face.Down, 6], [Face.Left, 6]], direction === Direction.Clockwise);
        break;
      case Face.Left:
        rotateEdges(newCubeState, [[Face.Up, 0], [Face.Front, 0], [Face.Down, 0], [Face.Back, 8]], direction === Direction.Clockwise);
        rotateEdges(newCubeState, [[Face.Up, 3], [Face.Front, 3], [Face.Down, 3], [Face.Back, 5]], direction === Direction.Clockwise);
        rotateEdges(newCubeState, [[Face.Up, 6], [Face.Front, 6], [Face.Down, 6], [Face.Back, 2]], direction === Direction.Clockwise);
        break;
      case Face.Right:
        rotateEdges(newCubeState, [[Face.Up, 8], [Face.Back, 0], [Face.Down, 8], [Face.Front, 8]], direction === Direction.Clockwise);
        rotateEdges(newCubeState, [[Face.Up, 5], [Face.Back, 3], [Face.Down, 5], [Face.Front, 5]], direction === Direction.Clockwise);
        rotateEdges(newCubeState, [[Face.Up, 2], [Face.Back, 6], [Face.Down, 2], [Face.Front, 2]], direction === Direction.Clockwise);
        break;
    }

    setCubeState(newCubeState);
  };

  return { cubeState, handleRotate };
};
