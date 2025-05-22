var express = require('express');
var router = express.Router();
const candidatController = require("../controllers/candidatcontroller");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/getAllCandidats', candidatController.getAllCandidats);
router.post('/addCandidats', upload.fields([
  { name: 'cv', maxCount: 1 },
  { name: 'lettre_motivation', maxCount: 1 },
  { name: 'diplome', maxCount: 1 }
]), candidatController.addCandidats);
router.delete('/deletCandidatsBYID/:id', candidatController.deletCandidatsBYID);
router.get('/getCandidatsBYID/:id', candidatController.getCandidatsBYID);
router.put('/updateCandidatsBYID/:id', candidatController.updateCandidatsBYID);

module.exports = router;
