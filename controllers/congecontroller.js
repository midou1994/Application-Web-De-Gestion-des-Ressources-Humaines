    const congeModel = require('../models/congeSchema')
    module.exports.getAllconge = async (req, res) => {
        try {
            const congeList = await congeModel.find();
            res.status(200).json(congeList);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    module.exports.addconge = async (req, res) => {
    try {
        const { date_debut, date_fin, nombre_jrs, type_conge, etat_conge, employe } = req.body;

        // Validation des champs obligatoires
        if (!date_debut || !date_fin || !nombre_jrs || !employe) {
            return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis" });
        }

        // Création d'un nouveau congé
        const newConge = new congeModel({
            date_debut: new Date(date_debut),
            date_fin: new Date(date_fin),
            nombre_jrs,
            type_conge: type_conge || 'Annuel', // Valeur par défaut
            etat_conge: etat_conge || 'En attente', // Valeur par défaut
            employe
        });

        // Validation du modèle avant sauvegarde
        const validationError = newConge.validateSync();
        if (validationError) {
            return res.status(400).json({ message: validationError.message });
        }

        // Sauvegarde dans la base de données
        const congeAdded = await newConge.save();
        
        res.status(201).json({
            message: "Congé ajouté avec succès",
            conge: congeAdded
        });

    } catch (error) {
        console.error("Erreur lors de l'ajout du congé:", error);
        res.status(500).json({ 
            message: "Erreur serveur lors de l'ajout du congé",
            error: error.message 
        });
    }
};