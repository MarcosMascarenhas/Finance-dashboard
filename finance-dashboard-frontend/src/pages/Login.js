import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpar mensagens de erro anteriores

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', { // Altere a URL se necessário
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Salvar token no localStorage
        localStorage.setItem('token', data.token);
        console.log('Login bem-sucedido!');
        // Redirecionar para a página principal (useNavigate se estiver usando react-router)
      } else {
        // Exibir mensagem de erro
        setError(data.msg || 'Erro ao fazer login. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao conectar com o backend:', error);
      setError('Erro de conexão. Tente novamente mais tarde.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibir mensagens de erro */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
