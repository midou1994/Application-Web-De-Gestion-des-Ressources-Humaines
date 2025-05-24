const FicheEntretient = require('../models/ficheentretientSchema');
const nodemailer = require('nodemailer');
const Candidat = require('../models/candidatschema');

// Configuration du transporteur d'email avec MailerSend
const transporter = nodemailer.createTransport({
    host: 'smtp.mailersend.net',
    port: 587,
    secure: false,
    auth: {
        user: 'MS_yeloaZ@test-yxj6lj9nkw74do2r.mlsender.net',
        pass: 'mssp.GonLr1O.ynrw7gy0rmol2k8e.DuTGtHK'
    }
});

module.exports.getAllFicheEntretient = async (req, res) => {
    try {
        const ficheentretients = await FicheEntretient.find()
            .populate('candidat', 'nom prenom email');
        res.status(200).json(ficheentretients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.addFicheEntretient = async (req, res) => {
    try {
        const { recruteur, technique_evaluation, communication_evaluation, motivation_evaluation, 
                preparation_evaluation, commantaire_recruteur, candidat, note, decision } = req.body;

        // Validation des champs obligatoires
        if (!candidat || !recruteur || !decision) {
            return res.status(400).json({ 
                message: "Le candidat, le recruteur et la décision sont obligatoires" 
            });
        }

        const newFicheEntretient = new FicheEntretient({
            recruteur,
            technique_evaluation,
            communication_evaluation,
            motivation_evaluation,
            preparation_evaluation,
            commantaire_recruteur,
            candidat,
            note,
            decision
        });

        const ficheentretientadded = await newFicheEntretient.save();
        
        // Récupérer les informations du candidat
        const candidatInfo = await Candidat.findById(candidat);
        if (!candidatInfo) {
            return res.status(404).json({ message: "Candidat non trouvé" });
        }

        // Préparer le contenu de l'email
        const mailOptions = {
            from: 'MS_yeloaZ@test-yxj6lj9nkw74do2r.mlsender.net',
            to: candidatInfo.email,
            subject: 'Résultat de votre entretien',
            html: `
                <h2>Résultat de votre entretien</h2>
                <p>Cher(e) ${candidatInfo.prenom} ${candidatInfo.nom},</p>
                <p>Nous avons le plaisir de vous informer du résultat de votre entretien :</p>
                <ul>
                    <li><strong>Décision :</strong> ${decision}</li>
                    ${note ? `<li><strong>Note :</strong> ${note}/20</li>` : ''}
                </ul>
                <h3>Détails de l'évaluation :</h3>
                <ul>
                    ${technique_evaluation ? `<li><strong>Évaluation technique :</strong> ${technique_evaluation}</li>` : ''}
                    ${communication_evaluation ? `<li><strong>Évaluation communication :</strong> ${communication_evaluation}</li>` : ''}
                    ${motivation_evaluation ? `<li><strong>Évaluation motivation :</strong> ${motivation_evaluation}</li>` : ''}
                    ${preparation_evaluation ? `<li><strong>Évaluation préparation :</strong> ${preparation_evaluation}</li>` : ''}
                </ul>
                ${commantaire_recruteur ? `<p><strong>Commentaires du recruteur :</strong><br>${commantaire_recruteur}</p>` : ''}
                <p>Nous vous remercions de votre intérêt pour notre entreprise.</p>
                <p>Cordialement,<br>L'équipe RH</p>
            `
        };

        // Envoyer l'email
        await transporter.sendMail(mailOptions);

        res.status(201).json({
            message: "Fiche d'entretien créée et email envoyé avec succès",
            fiche: ficheentretientadded
        });
    } catch (error) {
        console.error("Erreur lors de l'ajout de la fiche d'entretien:", error);
        res.status(500).json({ 
            message: "Erreur serveur lors de l'ajout de la fiche d'entretien",
            error: error.message 
        });
    }
}

module.exports.deletFicheEntretientBYID = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        await FicheEntretient.findByIdAndDelete(id)

        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.getFicheEntretientBYID = async (req, res) => {
    try {
        const { id } = req.params
        const ficheentretient = await FicheEntretient.findById(id)

        res.status(200).json(ficheentretient)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports.updateFicheEntretientBYID = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            recruteur, 
            technique_evaluation, 
            communication_evaluation, 
            motivation_evaluation, 
            preparation_evaluation, 
            commantaire_recruteur,
            note, 
            decision 
        } = req.body;

        // Validate required fields
        if (!recruteur || !decision) {
            return res.status(400).json({ 
                message: "Le recruteur et la décision sont obligatoires" 
            });
        }

        // Check if the document exists
        const existingFiche = await FicheEntretient.findById(id);
        if (!existingFiche) {
            return res.status(404).json({ message: "Fiche d'entretien non trouvée" });
        }

        // Update the document
        const updatedFiche = await FicheEntretient.findByIdAndUpdate(
            id,
            {
                $set: {
                    recruteur,
                    technique_evaluation,
                    communication_evaluation,
                    motivation_evaluation,
                    preparation_evaluation,
                    commantaire_recruteur,
                    note,
                    decision
                }
            },
            { new: true, runValidators: true }
        ).populate('candidat', 'nom prenom email');

        res.status(200).json(updatedFiche);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la fiche d'entretien:", error);
        res.status(500).json({ 
            message: "Erreur serveur lors de la mise à jour de la fiche d'entretien",
            error: error.message 
        });
    }
}
