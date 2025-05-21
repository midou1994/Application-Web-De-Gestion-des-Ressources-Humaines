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
            type_conge: type_conge || 'Annuel',
            etat_conge: etat_conge || 'En attente',
            employe,
            isActive: false
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

module.exports.updateConge = async (req, res) => {
    try {
        const { id } = req.params;
        const { date_debut, date_fin, nombre_jrs, type_conge, etat_conge, employe, isActive } = req.body;

        // Validation des champs obligatoires
        if (!date_debut || !date_fin || !nombre_jrs || !employe) {
            return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis" });
        }

        await congeModel.findByIdAndUpdate(id, {
            $set: {
                date_debut: new Date(date_debut),
                date_fin: new Date(date_fin),
                nombre_jrs,
                type_conge: type_conge || 'Annuel',
                etat_conge: etat_conge || 'En attente',
                employe,
                isActive: isActive !== undefined ? isActive : false
            }
        });

        const conge = await congeModel.findById(id);

        if (!conge) {
            return res.status(404).json({ message: "Congé non trouvé" });
        }

        res.status(200).json(conge);
    } catch (error) {
        console.error("Erreur lors de la mise à jour du congé:", error);
        res.status(500).json({ 
            message: "Erreur serveur lors de la mise à jour du congé",
            error: error.message 
        });
    }
};

// Nouvelle méthode pour activer/désactiver un congé
module.exports.toggleCongeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const conge = await congeModel.findById(id);

        if (!conge) {
            return res.status(404).json({ message: "Congé non trouvé" });
        }

        // Inverser le statut isActive
        conge.isActive = !conge.isActive;
        await conge.save();

        res.status(200).json({
            message: `Congé ${conge.isActive ? 'activé' : 'désactivé'} avec succès`,
            conge
        });
    } catch (error) {
        console.error("Erreur lors du changement de statut du congé:", error);
        res.status(500).json({ 
            message: "Erreur serveur lors du changement de statut du congé",
            error: error.message 
        });
    }
};

module.exports.getCongesByEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const conges = await congeModel.find({ employe: employeeId });
        
        if (!conges || conges.length === 0) {
            return res.status(404).json({ message: "Aucun congé trouvé pour cet employé" });
        }

        res.status(200).json(conges);
    } catch (error) {
        console.error("Erreur lors de la récupération des congés:", error);
        res.status(500).json({ 
            message: "Erreur serveur lors de la récupération des congés",
            error: error.message 
        });
    }
};