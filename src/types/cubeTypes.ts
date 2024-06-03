export enum Face {
    Up = 'Up',
    Down = 'Down',
    Left = 'Left',
    Right = 'Right',
    Front = 'Front',
    Back = 'Back'
  }

  export const faceToMaterialIndexMap = {
    [Face.Up]: 0,
    [Face.Down]: 1,
    [Face.Left]: 2,
    [Face.Right]: 3,
    [Face.Front]: 4,
    [Face.Back]: 5
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

  export enum Direction {
    Clockwise = 'clockwise',
    Counterclockwise = 'counterclockwise'
  }
  
  // https://colorswall.com/palette/171
  export const colorsMap = {
    [Color.White]: '#ffffff',
    [Color.Yellow]: '#ffd500',
    [Color.Green]: '#009b48',
    [Color.Blue]: '#0046ad',
    [Color.Red]: '#b71234',
    [Color.Orange]: '#ff8a00', // cube.exchange orange
    [Color.Black]: '#000000'
  };

  export const cubeColorSides = [
    [0, 1, Color.Red],    // Right face
    [0, -1, Color.Orange],// Left face
    [1, 1, Color.White],  // Top face
    [1, -1, Color.Blue],  // Bottom face
    [2, 1, Color.Green],  // Front face
    [2, -1, Color.Yellow] // Back face
  ];

