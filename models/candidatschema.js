const mongoose = require("mongoose");

const candidatSchema = new mongoose.Schema({
    matricule: { 
        type: String, 
        unique: true, 
        sparse: true,
        index: { 
            unique: true, 
            sparse: true 
        }
    },
    nom: String,
    prenom: String,
    email: { type: String, required: true, unique: true },
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
}, { 
    timestamps: true,
    // Désactiver la validation automatique des index
    autoIndex: false 
});

// Créer l'index manuellement après la définition du schéma
candidatSchema.index({ matricule: 1 }, { 
    unique: true, 
    sparse: true 
});

module.exports = mongoose.model("Candidat", candidatSchema);