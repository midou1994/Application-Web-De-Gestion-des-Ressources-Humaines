const mongoose = require("mongoose");
const ficheentretientSchema = new mongoose.Schema({

    recruteur: String,
    technique_evaluation: String,
    communication_evaluation: String,
    motivation_evaluation: String,
    preparation_evaluation: String,
    commantaire_recruteur: String,
    note: { type: Number, min: 0, max: 20 },

    decision: { type: String, enum: ['Accepté', 'Rejeté', 'Réserve'], default: 'Réserve' },
    candidat: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Candidat", 
        required: true 
      }

}, { timestamps: true });




module.exports = mongoose.model("FicheEntretient", ficheentretientSchema);
