const rendezvousModel = require('../models/rendezvousSchema');
const nodemailer = require('nodemailer');

// Configuration du transporteur d'email avec MailerSend
const transporter = nodemailer.createTransport({
    host: 'smtp.mailersend.net',
    port: 587,
    secure: false, // true pour 465, false pour les autres ports
    auth: {
        user: 'MS_yeloaZ@test-yxj6lj9nkw74do2r.mlsender.net',
        pass: 'mssp.GonLr1O.ynrw7gy0rmol2k8e.DuTGtHK'
    }
});

module.exports.getAllRendezVous = async (req, res) => {
    try {
        const rendezvousList = await rendezvousModel.find()
            .populate('candidat', 'nom prenom email telephone');
        res.status(200).json(rendezvousList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.addRendezVous = async (req, res) => {
    try {
        const { date, heure, type_entretien, notes, candidat, email, nom, prenom } = req.body;

        // Validation des champs obligatoires
        if (!date || !heure || !type_entretien || !candidat || !email || !nom || !prenom) {
            return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis" });
        }

        // Créer le rendez-vous dans la base de données
        const newRendezVous = new rendezvousModel({
            date: new Date(date),
            heure,
            type_entretien,
            candidat,
            notes,
            statut: 'En attente',
            isActive: true
        });

        const rendezvousAdded = await newRendezVous.save();
        
        // Populate les informations du candidat
        await rendezvousAdded.populate('candidat', 'nom prenom email telephone');

        // Formater la date pour l'email
        const dateFormatted = new Date(date).toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Préparer le contenu de l'email
        const mailOptions = {
            from: 'MS_yeloaZ@test-yxj6lj9nkw74do2r.mlsender.net',
            to: email,
            subject: 'Confirmation de votre entretien',
            html: `
                <h2>Confirmation de votre entretien</h2>
                <p>Cher(e) ${prenom} ${nom},</p>
                <p>Nous vous confirmons votre entretien qui aura lieu :</p>
                <ul>
                    <li><strong>Date :</strong> ${dateFormatted}</li>
                    <li><strong>Heure :</strong> ${heure}h</li>
                    <li><strong>Type d'entretien :</strong> ${type_entretien}</li>
                </ul>
                ${notes ? `<p><strong>Notes :</strong> ${notes}</p>` : ''}
                <p>Nous vous remercions de votre intérêt pour notre entreprise et nous nous réjouissons de vous rencontrer.</p>
                <p>Cordialement,<br>L'équipe RH</p>
            `
        };

        // Envoyer l'email
        await transporter.sendMail(mailOptions);

        res.status(201).json({
            message: "Rendez-vous créé et email envoyé avec succès",
            rendezvous: rendezvousAdded
        });

    } catch (error) {
        console.error("Erreur lors de l'ajout du rendez-vous:", error);
        res.status(500).json({ 
            message: "Erreur serveur lors de l'ajout du rendez-vous",
            error: error.message 
        });
    }
};

module.exports.updateRendezVous = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, heure, type_entretien, statut, notes, isActive } = req.body;

        await rendezvousModel.findByIdAndUpdate(id, {
            $set: {
                date: date ? new Date(date) : undefined,
                heure,
                type_entretien,
                statut,
                notes,
                isActive: isActive !== undefined ? isActive : true
            }
        });

        const rendezvous = await rendezvousModel.findById(id)
            .populate('candidat', 'nom prenom email telephone');

        if (!rendezvous) {
            return res.status(404).json({ message: "Rendez-vous non trouvé" });
        }

        res.status(200).json(rendezvous);
    } catch (error) {
        console.error("Erreur lors de la mise à jour du rendez-vous:", error);
        res.status(500).json({ 
            message: "Erreur serveur lors de la mise à jour du rendez-vous",
            error: error.message 
        });
    }
};

module.exports.deleteRendezVous = async (req, res) => {
    try {
        const { id } = req.params;
        await rendezvousModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Rendez-vous supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getRendezVousById = async (req, res) => {
    try {
        const { id } = req.params;
        const rendezvous = await rendezvousModel.findById(id)
            .populate('candidat', 'nom prenom email telephone');

        if (!rendezvous) {
            return res.status(404).json({ message: "Rendez-vous non trouvé" });
        }

        res.status(200).json(rendezvous);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getRendezVousByCandidat = async (req, res) => {
    try {
        const { candidatId } = req.params;
        const rendezvous = await rendezvousModel.find({ candidat: candidatId })
            .populate('candidat', 'nom prenom email telephone');

        if (!rendezvous || rendezvous.length === 0) {
            return res.status(404).json({ message: "Aucun rendez-vous trouvé pour ce candidat" });
        }

        res.status(200).json(rendezvous);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
