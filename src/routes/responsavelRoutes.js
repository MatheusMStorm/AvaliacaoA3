const express = require('express');
const router = express.Router();
const responsavelController = require('../controllers/responsavelController.js');

router.get('/api/responsaveis', responsavelController.getResponsaveis);
router.post('/api/responsaveis', responsavelController.createResponsavel);

module.exports = router;