const mongoose = require("mongoose");
const ficheentretientSchema = new mongoose.Schema({

    recruteur: String,
    technique_evaluation: String,
    communication_evaluation: String,
    motivation_evaluation: String,
    preparation_evaluation: String,
    commantaire_recruteur: String,
    decision: { type: String, enum: ['Accepté', 'Rejeté', 'Réserve'], default: 'Réserve' },


}, { timestamps: true });




module.exports = mongoose.model("FicheEntretient", ficheentretientSchema);
