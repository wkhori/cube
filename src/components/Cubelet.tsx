import { useLoader } from '@react-three/fiber';
import React, { useMemo } from 'react';
import { PlaneGeometry, TextureLoader } from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { Color, colorsMap } from '../types/cubeTypes';

interface CubeletProps {
  position: number[];
  colors: Color[]; // An array of 6 colors for the 6 sides of the cubelet
  onDragEnd: (direction: 'horizontal' | 'vertical') => void;
}

const Cubelet: React.FC<CubeletProps> = ({ position, colors, onDragEnd }) => {
  const geometry = useMemo(() => new RoundedBoxGeometry(1, 1, 1, 3, 0.1), []);

  // Load the texture for the image
  const texture = useLoader(TextureLoader, '/cube-logo.png'); // Reference the image in the public directory

  // Geometry for the smaller plane to render the logo
  const logoGeometry = useMemo(() => new PlaneGeometry(0.6, 0.6), []);

  // Check if this is the center white cubelet
  const isCenterWhite = position[0] === 0 && position[1] === 1 && position[2] === 0;

  return (
    <mesh position={position as [number, number, number]} geometry={geometry} >
      {[...Array(6).keys()].map((i) => (
        <meshStandardMaterial
          key={i}
          attach={`material-${i}`}
          color={colorsMap[colors[i]] || 'black'}
        />
      ))}
      {isCenterWhite && (
        <mesh geometry={logoGeometry} position={[0, 0.51, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.6, 0.6]} />
          <meshBasicMaterial
            map={texture}
            transparent={true}
          />
        </mesh>
      )}
    </mesh>
  );
};

export default Cubelet;
