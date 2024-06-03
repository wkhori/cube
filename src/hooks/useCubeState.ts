import { useState } from 'react';
import { Color, Direction, Face } from '../types/cubeTypes';

type CubeState = Record<Face, Color[]>;

const initialCubeState: CubeState = {
  [Face.Up]: Array(9).fill(Color.White),
  [Face.Down]: Array(9).fill(Color.Yellow),
  [Face.Front]: Array(9).fill(Color.Green),
  [Face.Back]: Array(9).fill(Color.Blue),
  [Face.Left]: Array(9).fill(Color.Orange),
  [Face.Right]: Array(9).fill(Color.Red),
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

const rotateFace = (face: Face, clockwise: boolean, cube: CubeState) => {
  const newFace = [...cube[face]];
  const indices = clockwise
    ? [6, 3, 0, 7, 1, 8, 5, 2, 4]
    : [2, 5, 8, 1, 7, 0, 3, 6, 4];
  for (let i = 0; i < 9; i++) {
    newFace[i] = cube[face][indices[i]];
  }
  cube[face] = newFace;
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

  const handleRotate = (face: Face, direction: Direction) => {
    const newCubeState: CubeState = { ...cubeState };


    switch (face) {
      case Face.Up:
        rotateEdges(newCubeState, [[Face.Front, 0], [Face.Right, 0], [Face.Back, 0], [Face.Left, 0]], direction === Direction.Clockwise);
        rotateEdges(newCubeState, [[Face.Front, 1], [Face.Right, 1], [Face.Back, 1], [Face.Left, 1]], direction === Direction.Clockwise);
        rotateEdges(newCubeState, [[Face.Front, 2], [Face.Right, 2], [Face.Back, 2], [Face.Left, 2]], direction === Direction.Clockwise);
        rotateFace(Face.Up, direction === Direction.Clockwise, newCubeState);
        break;
      case Face.Down:
        rotateEdges(newCubeState, [[Face.Front, 6], [Face.Left, 6], [Face.Back, 6], [Face.Right, 6]], direction === Direction.Clockwise);
        rotateEdges(newCubeState, [[Face.Front, 7], [Face.Left, 7], [Face.Back, 7], [Face.Right, 7]], direction === Direction.Clockwise);
        rotateEdges(newCubeState, [[Face.Front, 8], [Face.Left, 8], [Face.Back, 8], [Face.Right, 8]], direction === Direction.Clockwise);
        rotateFace(Face.Down, direction === Direction.Clockwise, newCubeState);
        break;
      case Face.Front:
        rotateEdges(newCubeState, [[Face.Up, 6], [Face.Left, 2], [Face.Down, 2], [Face.Right, 6]], direction === Direction.Clockwise);
        rotateEdges(newCubeState, [[Face.Up, 7], [Face.Left, 5], [Face.Down, 1], [Face.Right, 3]], direction === Direction.Clockwise);
        rotateEdges(newCubeState, [[Face.Up, 8], [Face.Left, 8], [Face.Down, 0], [Face.Right, 0]], direction === Direction.Clockwise);
        rotateFace(Face.Front, direction === Direction.Clockwise, newCubeState);
        break;
      case Face.Back:
        rotateEdges(newCubeState, [[Face.Up, 0], [Face.Right, 8], [Face.Down, 8], [Face.Left, 0]], direction === Direction.Clockwise);
        rotateEdges(newCubeState, [[Face.Up, 1], [Face.Right, 5], [Face.Down, 7], [Face.Left, 3]], direction === Direction.Clockwise);
        rotateEdges(newCubeState, [[Face.Up, 2], [Face.Right, 2], [Face.Down, 6], [Face.Left, 6]], direction === Direction.Clockwise);
        rotateFace(Face.Back, direction === Direction.Clockwise, newCubeState);
        break;
      case Face.Left:
        rotateEdges(newCubeState, [[Face.Up, 0], [Face.Front, 0], [Face.Down, 0], [Face.Back, 8]], direction === Direction.Clockwise);
        rotateEdges(newCubeState, [[Face.Up, 3], [Face.Front, 3], [Face.Down, 3], [Face.Back, 5]], direction === Direction.Clockwise);
        rotateEdges(newCubeState, [[Face.Up, 6], [Face.Front, 6], [Face.Down, 6], [Face.Back, 2]], direction === Direction.Clockwise);
        rotateFace(Face.Left, direction === Direction.Clockwise, newCubeState);
        break;
      case Face.Right:
        rotateEdges(newCubeState, [[Face.Up, 8], [Face.Back, 0], [Face.Down, 8], [Face.Front, 8]], direction === Direction.Clockwise);
        rotateEdges(newCubeState, [[Face.Up, 5], [Face.Back, 3], [Face.Down, 5], [Face.Front, 5]], direction === Direction.Clockwise);
        rotateEdges(newCubeState, [[Face.Up, 2], [Face.Back, 6], [Face.Down, 2], [Face.Front, 2]], direction === Direction.Clockwise);
        rotateFace(Face.Right, direction === Direction.Clockwise, newCubeState);
        break;
    }

    setCubeState(newCubeState);
  };

  return { cubeState, handleRotate, getCubeletColors };
};
