// src/components/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home'; // Asegúrate de importar cualquier componente que necesites

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Agrega más rutas aquí */}
    </Routes>
  );
};

export default App;
