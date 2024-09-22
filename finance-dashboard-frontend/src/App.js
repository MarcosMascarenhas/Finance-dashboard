import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Login from './pages/Login';

function App() {
  // Função para buscar dados do backend
  const fetchData = async () => {
    try {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      console.log(data); // Verifica os dados no console
    } catch (error) {
      console.error('Erro ao conectar com o backend:', error);
    }
  };

  // Chama a função fetchData assim que o componente carregar
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>Finance Dashboard</h1>
        <Routes>
          {/* Página de Login como padrão */}
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


