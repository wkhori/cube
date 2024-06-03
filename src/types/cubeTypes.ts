export enum Face {
    Up = 'Up',
    Down = 'Down',
    Left = 'Left',
    Right = 'Right',
    Front = 'Front',
    Back = 'Back'
  }

  export const faceAdjacencyMap: Record<Face, [Face, Face, Face, Face]> = {
    [Face.Up]: [Face.Back, Face.Right, Face.Front, Face.Left],
[Face.Down]: [Face.Front, Face.Right, Face.Back, Face.Left],
    [Face.Left]: [Face.Up, Face.Front, Face.Down, Face.Back],
    [Face.Right]: [Face.Up, Face.Back, Face.Down, Face.Front],
    [Face.Front]: [Face.Up, Face.Right, Face.Down, Face.Left],
    [Face.Back]: [Face.Up, Face.Left, Face.Down, Face.Right],
  };

export   const faceEdgeIndicesMap: Record<Face, { [adjFace: string]: [number, number, number] }> = {
    [Face.Up]: {
      [Face.Back]: [0, 3, 6],
      [Face.Right]: [0, 1, 2],
      [Face.Front]: [0, 3, 6],
      [Face.Left]: [0, 1, 2],
    },
    [Face.Left]: {
      [Face.Up]: [6,7,8],
      [Face.Front]: [6,7,8],
      [Face.Down]: [6,7,8],
      [Face.Back]: [6,7,8],
    },
    [Face.Right]: {
      [Face.Up]: [0,1,2],
      [Face.Back]: [0,1,2],
      [Face.Down]: [0,1,2],
      [Face.Front]: [0,1,2],
    },

    [Face.Down]: {
      [Face.Front]: [8, 5, 2],
      [Face.Right]: [8, 7, 6],
      [Face.Back]: [8, 5, 2],
      [Face.Left]: [8, 7, 6],
    },
    [Face.Front]: {
      [Face.Up]: [0,3,6],
      [Face.Right]: [0, 3, 6],
      [Face.Down]: [0, 3, 6],
      [Face.Left]: [0, 3, 6],
    },
    [Face.Back]: {
      [Face.Up]: [8, 5, 2],
      [Face.Left]: [8, 5, 2],
      [Face.Down]: [8, 5, 2],
      [Face.Right]: [8, 5, 2],
    },
  };

  export enum Color {
    White = 'White',
    Yellow = 'Yellow',
    Orange = 'Orange',
    Red = 'Red',
    Green = 'Green',
    Blue = 'Blue',
    Black = 'Black'
  }

  export const colorsMap = {
    [Color.White]: '#ffffff',
    [Color.Yellow]: '#ffd500',
    [Color.Green]: '#009b48',
    [Color.Blue]: '#0046ad',
    [Color.Red]: '#b71234',
    [Color.Orange]: '#ff8a00', // cube.exchange orange
    [Color.Black]: '#000000'
  };

  export enum Direction {
    Clockwise = 'clockwise',
    Counterclockwise = 'counterclockwise'
  }
  