const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const authMiddleware = require('../middleware/auth'); // Importando o middleware de autenticação

// @route    POST /api/transactions
// @desc     Criar uma nova transação
// @access   Privado (somente usuários autenticados)
router.post('/', authMiddleware, async (req, res) => {
  const { type, description, amount, category, userId } = req.body;

  try {
    const newTransaction = new Transaction({
      type,
      description,
      amount,
      category,
      userId: req.user.id, // Pegando o ID do usuário autenticado
    });

    const transaction = await newTransaction.save();
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// @route    GET /api/transactions
// @desc     Obter todas as transações do usuário autenticado
// @access   Privado (somente usuários autenticados)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;
