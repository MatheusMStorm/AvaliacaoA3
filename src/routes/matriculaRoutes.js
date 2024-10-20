const express = require('express');
const router = express.Router();
const matriculaController = require('../controllers/matriculaController.js');

router.get('/api/matriculas', matriculaController.getMatriculas);
router.post('/api/matriculas', matriculaController.createMatricula);

module.exports = router;