import { useLoader } from '@react-three/fiber';
import React, { useMemo } from 'react';
import { PlaneGeometry, TextureLoader } from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { Color, colorsMap } from '../types/cubeTypes';

interface CubeletProps {
  position: number[];
  geometry: RoundedBoxGeometry;
  colors: Color[]; // An array of 6 colors for the 6 sides of the cubelet
}

const Cubelet: React.FC<CubeletProps> = ({ position, geometry, colors }) => {

  
  const cubeLogo = useLoader(TextureLoader, '/cube-logo.png');

  const logoGeometry = useMemo(() => new PlaneGeometry(0.6, 0.6), []);

  // display the logo on the center of white face
  const displayLogo = position[0] === 0 && position[1] === 1 && position[2] === 0;

  return (
    <mesh position={position as [number, number, number]} geometry={geometry} >
      {[...Array(6).keys()].map((i) => (
        <meshStandardMaterial
          key={i}
          attach={`material-${i}`}
          color={colorsMap[colors[i]] }
        />
      ))}
      {displayLogo && (
        <mesh geometry={logoGeometry} position={[0, 0.51, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.6, 0.6]} />
          <meshBasicMaterial
            map={cubeLogo}
            transparent={true}
          />
        </mesh>
      )}
    </mesh>
  );
};

export default Cubelet;
