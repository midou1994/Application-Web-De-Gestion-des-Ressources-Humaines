const express = require('express');
const router = express.Router();
const carriereController = require('../controllers/carriereController');

// Routes principales
router.get('/', carriereController.getAllCarrieres);
router.get('/employee/:employeeId', carriereController.getCarriereByEmployee);
router.post('/', carriereController.createCarriere);
router.put('/:id', carriereController.updateCarriere);

// Routes pour les compétences
router.post('/:id/competences', carriereController.addCompetence);

// Routes pour les besoins de formation
router.post('/:id/besoins-formation', carriereController.addBesoinFormation);

// Routes pour les mobilités
router.post('/:id/mobilites', carriereController.addMobilite);

// Routes pour le plan de carrière
router.post('/:id/plan-carriere', carriereController.updatePlanCarriere);
router.put('/:id/plan-carriere', carriereController.updatePlanCarriere);

// Routes pour les évaluations
router.post('/:id/evaluations', carriereController.addEvaluation);

module.exports = router; 