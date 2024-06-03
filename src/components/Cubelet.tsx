import { useLoader } from '@react-three/fiber';
import React from 'react';
import { TextureLoader } from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { Color, colorsMap, cubeColorSides } from '../types/cubeTypes';

interface CubeletProps {
  position: number[];
  onDragEnd: (direction: 'horizontal' | 'vertical') => void;
}

const getCubeletColors = (position: number[]): Color[] => {
    return cubeColorSides.map(([axis, pos, color]) =>
      position[axis as number] === pos ? color : Color.Black
    ) as Color[];
  };
  

const Cubelet: React.FC<CubeletProps> = ({ position, onDragEnd }) => {
  const geometry = new RoundedBoxGeometry(1, 1, 1, 3, 0.1);
  const colors: Color[] = getCubeletColors(position);
  const texture = useLoader(TextureLoader, './public/cube-logo.png');
  const isCenter = position[0] === 0  && position[1] === 0;

  return (
    <mesh position={position as [number, number, number]} geometry={geometry} >
      {[...Array(6).keys()].map((i) => (
        <meshStandardMaterial
          key={i}
          attach={`material-${i}`}
          color={colorsMap[colors[i]] }
          map={isCenter ? texture : undefined} // add logo to center cubelet
          transparent={true}
          
        />
      ))}
    </mesh>
  );
};

export default Cubelet;
