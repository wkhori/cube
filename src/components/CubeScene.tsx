import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react';
import CubeComponent3D from './CubeComponent3D';

const CubeScene: React.FC = () => {


return (
    <Canvas style={{height: 500, width: 500}}>
        <ambientLight intensity={1} />
        <pointLight position={[100, 10, 10]}  />
        <PerspectiveCamera makeDefault  position={[10,10,10]}/>
        <CubeComponent3D />

        <OrbitControls 
            minDistance={15} 
            maxDistance={15} 
            target={[0, 0, 0]} 
            enablePan={false}
        />
        <Environment preset="city" />
    </Canvas>
);
};

export default CubeScene;
