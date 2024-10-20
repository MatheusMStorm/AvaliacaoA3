const express = require('express');
const router = express.Router();
const turmaController = require('../controllers/turmaController.js');

router.get('/api/turmas', turmaController.getTurmas);
router.post('/api/turmas', turmaController.createTurma);

module.exports = router;