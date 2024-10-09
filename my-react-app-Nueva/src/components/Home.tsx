import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Página de Inicio</h1>
      <p>Bienvenido a la aplicación.</p>
      <Link to="/form">
        <Button variant="contained" color="primary">
          Ir al Formulario
        </Button>
      </Link>
    </div>
  );
};

export default Home;
