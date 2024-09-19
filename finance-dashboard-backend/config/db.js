const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/finance_dashboard', {
      useNewUrlParser: true,
    });
    console.log('MongoDB conectado com sucesso');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB', err);
    process.exit(1); // Sai do processo com falha
  }
};

module.exports = connectDB;
