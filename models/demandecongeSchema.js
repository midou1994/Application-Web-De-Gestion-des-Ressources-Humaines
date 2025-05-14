const mongoose = require("mongoose");

const demandecongeSchema = new mongoose.Schema({
  date_debut: { type: Date, required: true },
  date_fin: { type: Date, required: true },
  nombre_jrs: { type: Number, required: true, min: 1 },
  type_conge: { 
    type: String, 
    enum: ["Annuel", "Maladie", "Exceptionnel", "Maternité"], 
    required: true 
  },
  etat_conge: { 
    type: String, 
    enum: ["En attente", "Approuvé", "Rejeté"], 
    default: "en attente" 
  },
  employe: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Employe", 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model("DemandeConge", demandecongeSchema);