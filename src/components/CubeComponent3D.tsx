import React, { useMemo } from 'react';
import { Color } from 'src/types/cubeTypes';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import Cubelet from './Cubelet';

interface CubeComponent3DProps {
  getCubeletColors: (position: [number, number, number]) => Color[];
}

const CubeComponent3D: React.FC<CubeComponent3DProps> = ({ getCubeletColors }) => {
  const geometry = useMemo(() => new RoundedBoxGeometry(1, 1, 1, 3, 0.1), []);

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

export default CubeComponent3D;
