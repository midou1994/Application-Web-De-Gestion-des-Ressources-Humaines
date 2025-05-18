var express = require('express');
var router = express.Router();
const candidatController = require("../controllers/candidatcontroller");


router.get('/getAllCandidats', candidatController.getAllCandidats);
router.post('/addCandidats', candidatController.addCandidats);
router.delete('/deletCandidatsBYID/:id', candidatController.deletCandidatsBYID);
router.get('/getCandidatsBYID/:id', candidatController.getCandidatsBYID);
router.put('/updateCandidatsBYID/:id', candidatController.updateCandidatsBYID);

module.exports = router;
