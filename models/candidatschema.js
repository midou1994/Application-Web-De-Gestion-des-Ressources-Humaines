const mongoose = require("mongoose");

const candidatSchema = new mongoose.Schema({
    
    nom: String,
    prenom: String,
    email: { type: String, required: true, unique: true, },
    cin: { type: String, required: true, unique: true, match: [/^\d{8}$/, 'Le numéro CIN doit contenir exactement 8 chiffres'] },
    date_naissance: Date,
    adresse: String,
    telephone: { type: String, required: true, unique: true, match: [/^\d{8}$/, 'Le numéro de téléphone doit contenir exactement 8 chiffres'] },
    post: String,
    niveau_etude: String,
    experience: String,
    cv: String,
    lettre_motivation: String,
    diplome: String,
    annee_obtention: String,
    email: { type: String, required: true, unique: true },
    

}, { timestamps: true });



module.exports = mongoose.model("Candidat", candidatSchema);