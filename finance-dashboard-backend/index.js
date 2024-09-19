const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Definição de rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/transactions', require('./routes/transactions'));

// Porta do servidor
const PORT = process.env.PORT || 5000;

// Conecta ao MongoDB e inicia o servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch((err) => {
  console.error('Erro ao conectar ao MongoDB:', err.message);
  process.exit(1); // Encerra o processo em caso de erro na conexão
});
