import { Routes, Route } from 'react-router-dom';
import Home from './Home'; // Asegúrate de que el componente Home existe

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Agrega más rutas aquí */}
    </Routes>
  );
};

export default App;
