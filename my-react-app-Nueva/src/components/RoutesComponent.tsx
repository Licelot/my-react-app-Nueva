import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ContractForm from './ContractForm'; // Importa tu formulario
import Home from './Home'; // Crea un componente Home si no lo tienes




const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Ruta principal */}
      <Route path="/contract-form" element={<ContractForm />} /> {/* Ruta hacia tu formulario */}
      {/* Puedes agregar más rutas aquí */}
    </Routes>
  );
};

export default RoutesComponent;
