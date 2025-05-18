const express = require('express');
const router = express.Router();
const ficheentretientController = require('../controllers/ficheentretientcontroller');

router.post('/addFicheEntretient', ficheentretientController.addFicheEntretient);
router.get('/getAllFicheEntretient', ficheentretientController.getAllFicheEntretient);
router.get('/getFicheEntretientBYID/:id', ficheentretientController.getFicheEntretientBYID);
router.put('/updateFicheEntretientBYID/:id', ficheentretientController.updateFicheEntretientBYID);
router.delete('/deletFicheEntretientBYID/:id', ficheentretientController.deletFicheEntretientBYID);

module.exports = router;
