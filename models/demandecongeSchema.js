const mongoose = require("mongoose");
const demandecongeSchema = new mongoose.Schema({

  date_debut: Date,
  date_fin: Date,
  nombre_jrs: String,
  type_conge: { type: String, enum: ["annuel", "maladie", "exceptionnel", "maternité"]}, 
  etat_conge: { type: String, default: "en attente" },
  matricule: { type: String, required: true, unique: true },
}, { timestamps: true });
  




const DemandeConge = mongoose.model("DemandeConge", demandecongeSchema);
module.exports = DemandeConge;