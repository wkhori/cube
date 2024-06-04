import React, { useState } from "react";
import { Direction, Face, defaultFaceColors } from "../types/cubeTypes";

interface ControlsProps {
  onRotate: (face: Face, direction: Direction) => void;
}

const CubeControls: React.FC<ControlsProps> = ({ onRotate }) => {
  const [selectedFace, setSelectedFace] = useState<Face>(Face.Up);

  const handleFaceChange = (face: Face) => {
    setSelectedFace(face);
  };

  const faceButtons = [
    { face: Face.Up, label: "Top" },
    { face: Face.Down, label: "Bottom" },
    { face: Face.Left, label: "Left" },
    { face: Face.Right, label: "Right" },
    { face: Face.Front, label: "Front" },
    { face: Face.Back, label: "Back" },
  ];

  return (
    <div className="controls-container flex flex-col items-center justify-center w-full px-20">
      <div className="face-buttons-container grid grid-cols-2 gap-2 mb-4 w-full sm:grid-cols-3 lg:grid-cols-6">
        {faceButtons.map(({ face, label }) => (
          <button
            key={face}
            onClick={() => handleFaceChange(face)}
            className={`p-2 rounded-lg ${
              selectedFace === face
                ? "border-2 border-white"
                : "border border-gray-700"
            }
              ${selectedFace === face ? "bg-opacity-80" : "bg-opacity-20"}
              ${selectedFace === face ? "text-black" : "text-gray-700"}
              transition duration-200 ease-in-out transform hover:scale-105`}
            style={{
              backgroundColor:
                selectedFace === face ? defaultFaceColors[face] : "transparent",
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex gap-4 items-center justify-between  px-12 pt-2 w-full">
        <button
          onClick={() => onRotate(selectedFace, Direction.Counterclockwise)}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200 ease-in-out transform hover:-rotate-90"
        >
          <img
            src="/counter-clockwise.svg"
            alt="Counter Clockwise"
            className="w-8 h-8"
          />
        </button>
        <button
          onClick={() => onRotate(selectedFace, Direction.Clockwise)}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200 ease-in-out transform hover:rotate-90"
        >
          <img src="/clockwise.svg" alt="Clockwise" className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default CubeControls;
