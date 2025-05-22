const mongoose = require("mongoose");

const rendezvousSchema = new mongoose.Schema({
    date: { 
        type: Date, 
        required: true 
    },
    heure: { 
        type: String, 
        required: true 
    },
    type_entretien: { 
        type: String, 
        enum: ['Présentiel', 'Virtuel', 'Téléphonique'],
        required: true 
    },
    statut: { 
        type: String, 
        enum: ['En attente', 'Confirmé', 'Annulé', 'Terminé'],
        default: 'En attente'
    },
    candidat: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Candidat', 
        required: true 
    },
    notes: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model("RendezVous", rendezvousSchema);
