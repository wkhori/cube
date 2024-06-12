import { Color, Face } from "./cubeTypes";

export const colorsMap = {
  [Color.White]: "#ffffff",
  [Color.Yellow]: "#ffd500",
  [Color.Green]: "#009b48",
  [Color.Blue]: "#0046ad",
  [Color.Red]: "#b71234",
  [Color.Orange]: "#ff8a00", // cube.exchange orange
  [Color.Black]: "#000000",
};

export const defaultFaceColors = {
  [Face.Up]: Color.White,
  [Face.Down]: Color.Yellow,
  [Face.Front]: Color.Green,
  [Face.Back]: Color.Blue,
  [Face.Left]: Color.Orange,
  [Face.Right]: Color.Red,
};

export const faceAdjacencyMap: Record<Face, [Face, Face, Face, Face]> = {
  [Face.Up]: [Face.Back, Face.Right, Face.Front, Face.Left],
  [Face.Down]: [Face.Front, Face.Right, Face.Back, Face.Left],
  [Face.Left]: [Face.Up, Face.Front, Face.Down, Face.Back],
  [Face.Right]: [Face.Up, Face.Back, Face.Down, Face.Front],
  [Face.Front]: [Face.Up, Face.Right, Face.Down, Face.Left],
  [Face.Back]: [Face.Up, Face.Left, Face.Down, Face.Right],
};

export const faceIndices: {
  [key in Face]: (pos: [number, number, number]) => number;
} = {
  [Face.Right]: (pos) => (1 - pos[1]) * 3 + (1 - pos[2]),
  [Face.Left]: (pos) => (1 - pos[1]) * 3 + (1 - pos[2]),
  [Face.Up]: (pos) => (1 - pos[0]) * 3 + (1 - pos[2]),
  [Face.Down]: (pos) => (1 - pos[0]) * 3 + (1 - pos[2]),
  [Face.Front]: (pos) => (1 - pos[0]) * 3 + (1 - pos[1]),
  [Face.Back]: (pos) => (1 - pos[0]) * 3 + (1 - pos[1]),
};

export const faceEdgeIndicesMap: Record<
  Face,
  { [adjFace: string]: [number, number, number] }
> = {
  [Face.Up]: {
    [Face.Back]: [0, 3, 6],
    [Face.Right]: [0, 1, 2],
    [Face.Front]: [6, 3, 0],
    [Face.Left]: [2, 1, 0],
  },
  [Face.Left]: {
    [Face.Up]: [8, 7, 6],
    [Face.Front]: [6, 7, 8],
    [Face.Down]: [6, 7, 8],
    [Face.Back]: [8, 7, 6],
  },
  [Face.Right]: {
    [Face.Up]: [2, 1, 0],
    [Face.Back]: [2, 1, 0],
    [Face.Down]: [0, 1, 2],
    [Face.Front]: [0, 1, 2],
  },
  [Face.Down]: {
    [Face.Front]: [8, 5, 2],
    [Face.Right]: [6, 7, 8],
    [Face.Back]: [2, 5, 8],
    [Face.Left]: [8, 7, 6],
  },
  [Face.Front]: {
    [Face.Up]: [0, 3, 6],
    [Face.Right]: [6, 3, 0],
    [Face.Down]: [6, 3, 0],
    [Face.Left]: [0, 3, 6],
  },
  [Face.Back]: {
    [Face.Up]: [2, 5, 8],
    [Face.Left]: [2, 5, 8],
    [Face.Down]: [8, 5, 2],
    [Face.Right]: [8, 5, 2],
  },
};
