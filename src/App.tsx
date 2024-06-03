import React from 'react';
import CubeScene from './components/CubeScene';

const App: React.FC = () => {

  return (
    <div className="flex flex-col justify-center items-center min-h-full w-full">
      <h1 className="text-4xl font-bold mb-8 text-white font-plex-mono">rubiks.cube</h1>
      <CubeScene  />
    </div>
  );
};

export default App;
