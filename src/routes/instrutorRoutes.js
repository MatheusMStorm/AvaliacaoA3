const express = require('express');
const router = express.Router();
const instrutorController = require('../controllers/instrutorController.js')

router.get('/api/instrutores', instrutorController.getInstrutores);
router.post('/api/instrutores', instrutorController.createInstrutor);

module.exports = router;