export enum Face {
    Up = 'Up',
    Down = 'Down',
    Left = 'Left',
    Right = 'Right',
    Front = 'Front',
    Back = 'Back'
  }

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
    [0, 1, Color.Orange],
    [0, -1, Color.Red],
    [1, 1, Color.White],
    [1, -1, Color.Yellow],
    [2, 1, Color.Green],
    [2, -1, Color.Blue]
];