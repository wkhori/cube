import React from 'react';
import { Direction, Face } from '../types/cubeTypes';

interface ControlsProps {
  onRotate: (face: Face, direction: Direction) => void;
}

const CubeControls: React.FC<ControlsProps> = ({ onRotate }) => {
  return (
    <div className="controls flex gap-2">
      <button onClick={() => onRotate(Face.Left, Direction.Clockwise)} >Left CW</button>
      <button onClick={() => onRotate(Face.Left, Direction.Counterclockwise)}>Left CCW</button>
      <button onClick={() => onRotate(Face.Right, Direction.Clockwise)}>Right CW</button>
      <button onClick={() => onRotate(Face.Right, Direction.Counterclockwise)}>Right CCW</button>
      <button onClick={() => onRotate(Face.Front, Direction.Clockwise)}>Front CW</button>
      <button onClick={() => onRotate(Face.Front, Direction.Counterclockwise)}>Front CCW</button>
      <button onClick={() => onRotate(Face.Back, Direction.Clockwise)}>Back CW</button>
      <button onClick={() => onRotate(Face.Back, Direction.Counterclockwise)}>Back CCW</button>
      <button onClick={() => onRotate(Face.Up, Direction.Clockwise)}>Top CW</button>
      <button onClick={() => onRotate(Face.Up, Direction.Counterclockwise)}>Top CCW</button>
      <button onClick={() => onRotate(Face.Down, Direction.Clockwise)}>Bottom CW</button>
      <button onClick={() => onRotate(Face.Down, Direction.Counterclockwise)}>Bottom CCW</button>
    </div>
  );
};

export default CubeControls;
