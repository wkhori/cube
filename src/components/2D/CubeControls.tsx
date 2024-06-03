import React from 'react';
import { Face } from '../../types/cubeTypes';

interface CubeControlsProps {
  handleRotate: (face: Face, direction: 'clockwise' | 'counterclockwise') => void;
  selectedFace: Face | null;
}

const CubeControls: React.FC<CubeControlsProps> = ({ handleRotate, selectedFace }) => {
  return (
    <div className="controls mt-4 flex flex-wrap gap-2">
      {selectedFace && (
        <div className="flex flex-col items-center">
          <button
            className="btn bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => handleRotate(selectedFace, 'clockwise')}
          >
            Rotate {selectedFace} Clockwise
          </button>
          <button
            className="btn bg-red-500 text-white py-2 px-4 rounded mt-2"
            onClick={() => handleRotate(selectedFace, 'counterclockwise')}
          >
            Rotate {selectedFace} Counterclockwise
          </button>
        </div>
      )}
    </div>
  );
};

export default CubeControls;
