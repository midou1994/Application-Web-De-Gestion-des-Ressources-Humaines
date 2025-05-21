  const mongoose = require("mongoose");

  const employeSchema = new mongoose.Schema({
    matricule: { type: String, required: true, unique: true },
    nom: String,
    prenom: String,
    cin: { type: String, required: true, unique: true,match: [/^\d{8}$/, 'Le numéro CIN doit contenir exactement 8 chiffres']},
    date_naissance: Date,
    adresse: String,
    telephone: { type: String, required: true, unique: true, match: [/^\d{8}$/, 'Le numéro de téléphone doit contenir exactement 8 chiffres']},
    post: String,
    photo: String, 
    
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  }, { timestamps: true });
    


  const Employe = mongoose.model("Employe", employeSchema);
  module.exports = Employe;