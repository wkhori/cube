import React, { useState } from 'react';
import { useCubeState } from '../../hooks/useCubeState';
import { Color, Face } from '../../types/cubeTypes';
import CubeControls from './CubeControls';

const CubeComponent: React.FC = () => {
  const { cubeState, handleRotate } = useCubeState();
  const [selectedFace, setSelectedFace] = useState<Face | null>(null);

  const renderFace = (face: Color[], faceKey: Face) => (
    <div
      className={`face face-${faceKey.toLowerCase()} grid grid-cols-3 gap-1 ${selectedFace === faceKey ? 'border-4 border-yellow-500' : ''}`}
      onClick={() => setSelectedFace(faceKey)}
    >
      {face.map((color, index) => {
        let colorClass;
        switch (color) {
          case Color.White:
            colorClass = 'bg-white';
            break;
          case Color.Yellow:
            colorClass = 'bg-yellow-500';
            break;
          case Color.Green:
            colorClass = 'bg-green-500';
            break;
          case Color.Blue:
            colorClass = 'bg-blue-500';
            break;
          case Color.Red:
            colorClass = 'bg-red-500';
            break;
          case Color.Orange:
            colorClass = 'bg-orange-500';
            break;
          default:
            colorClass = '';
        }

        return (
          <div key={index} className={`cubelet ${colorClass} w-16 h-16`}></div>
        );
      })}
    </div>
  );

  return (
    <div className="p-4">
      <div className="cube grid grid-cols-4 gap-4 justify-center">
        <div className="col-span-4 flex justify-center">{renderFace(cubeState[Face.Up], Face.Up)}</div>
        <div className="col-span-1">{renderFace(cubeState[Face.Left], Face.Left)}</div>
        <div className="col-span-1">{renderFace(cubeState[Face.Front], Face.Front)}</div>
        <div className="col-span-1">{renderFace(cubeState[Face.Right], Face.Right)}</div>
        <div className="col-span-1">{renderFace(cubeState[Face.Back], Face.Back)}</div>
        <div className="col-span-4 flex justify-center">{renderFace(cubeState[Face.Down], Face.Down)}</div>
      </div>
      <CubeControls handleRotate={handleRotate} selectedFace={ selectedFace} />
    </div>
  );
};

export default CubeComponent;
