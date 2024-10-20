const express = require('express');
const router = express.Router();
const criancaController = require('../controllers/criancaController.js');

router.get('/api/criancas', criancaController.getCriancas);
router.post('/api/criancas', criancaController.createCrianca);

module.exports = router;