const mongoose = require('mongoose');

const carriereSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employe',
        required: true
    },
    // Informations sur le poste actuel
    posteActuel: {
        titre: {
            type: String,
            required: true
        },
        departement: {
            type: String,
            required: true
        },
        dateDebut: {
            type: Date,
            required: true
        },
        niveau: {
            type: String,
            required: true
        }
    },
    // Compétences
    competences: [{
        nom: {
            type: String,
            required: true
        },
        niveau: {
            type: String,
            enum: ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'],
            required: true
        },
        dateAcquisition: {
            type: Date,
            required: true
        }
    }],
    // Besoins de formation
    besoinsFormation: [{
        type: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        priorite: {
            type: String,
            enum: ['Basse', 'Moyenne', 'Haute'],
            required: true
        },
        statut: {
            type: String,
            enum: ['En attente', 'En cours', 'Terminée'],
            default: 'En attente'
        }
    }],
    // Historique des mobilités
    mobilites: [{
        type: {
            type: String,
            enum: ['Promotion', 'Mutation', 'Changement de poste'],
            required: true
        },
        ancienPoste: {
            type: String,
            required: true
        },
        nouveauPoste: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        raison: {
            type: String,
            required: true
        }
    }],
    // Plan de carrière
    planCarriere: {
        objectifs: [{
            description: {
                type: String,
                required: true
            },
            echeance: {
                type: Date,
                required: true
            },
            statut: {
                type: String,
                enum: ['Non commencé', 'En cours', 'Atteint'],
                default: 'Non commencé'
            }
        }],
        cheminProgression: {
            posteSouhaite: {
                type: String,
                required: true
            },
            delaiEstime: {
                type: Number, // en mois
                required: true
            },
            competencesRequises: [{
                type: String,
                required: true
            }]
        }
    },
    // Évaluations de performance
    evaluations: [{
        date: {
            type: Date,
            required: true
        },
        type: {
            type: String,
            enum: ['Annuelle', 'Semestrielle', 'Trimestrielle'],
            required: true
        },
        note: {
            type: Number,
            min: 0,
            max: 20,
            required: true
        },
        commentaires: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Carriere', carriereSchema);