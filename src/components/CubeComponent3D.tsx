import React, { useMemo } from 'react';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { useCubeState } from '../hooks/useCubeState';
import { Face } from '../types/cubeTypes';
import Cubelet from './Cubelet';

const CubeComponent3D: React.FC = () => {
  const { cubeState, getCubeletColors } = useCubeState();


  const geometry = useMemo(() => new RoundedBoxGeometry(1, 1, 1, 3, 0.1), []);


  console.log(cubeState);
  return (
    <group scale={[2, 2, 2]}>
      {[...Array(3).keys()].map((x) =>
        [...Array(3).keys()].map((y) =>
          [...Array(3).keys()].map((z) => {
            const cubeletPosition: [number, number, number] = [x - 1, y - 1, z - 1];
            const cubeletColors = getCubeletColors(cubeletPosition);
            return (
              <Cubelet
                key={`${x}-${y}-${z}`}
                position={cubeletPosition}
                geometry={geometry}
                colors={cubeletColors}
              
              />
            );
          })
        )
      )}
    </group>
  );
};

const getFaceFromPosition = (position: [number, number, number]): Face => {
  if (position[1] === 1) return Face.Up;
  if (position[1] === -1) return Face.Down;
  if (position[2] === 1) return Face.Front;
  if (position[2] === -1) return Face.Back;
  if (position[0] === -1) return Face.Left;
  if (position[0] === 1) return Face.Right;
  return Face.Front;
};

export default CubeComponent3D;
