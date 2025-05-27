const Carriere = require('../models/carriereSchema');
const Employe = require('../models/employeSchema');

// Obtenir toutes les carrières
module.exports.getAllCarrieres = async (req, res) => {
    try {
        const carrieres = await Carriere.find()
            .populate({
                path: 'employee',
                select: 'nom prenom email',
                model: 'Employe'
            })
            .lean();

        // Transformer les données pour inclure les informations de l'employé
        const formattedCarrieres = carrieres.map(carriere => {
            const formattedCarriere = {
                ...carriere,
                employee: carriere.employee ? {
                    _id: carriere.employee._id,
                    nom: carriere.employee.nom,
                    prenom: carriere.employee.prenom
                } : null,
                posteActuel: carriere.posteActuel ? {
                    ...carriere.posteActuel,
                    dateDebut: carriere.posteActuel.dateDebut.toISOString()
                } : null,
                mobilites: carriere.mobilites.map(mobilite => ({
                    ...mobilite,
                    date: mobilite.date.toISOString()
                })),
                competences: carriere.competences.map(competence => ({
                    ...competence,
                    dateAcquisition: competence.dateAcquisition.toISOString()
                })),
                createdAt: carriere.createdAt.toISOString(),
                updatedAt: carriere.updatedAt.toISOString()
            };

            // Formater les dates dans planCarriere si présent
            if (carriere.planCarriere) {
                formattedCarriere.planCarriere = {
                    ...carriere.planCarriere,
                    objectifs: carriere.planCarriere.objectifs.map(objectif => ({
                        ...objectif,
                        echeance: objectif.echeance.toISOString()
                    }))
                };
            }

            return formattedCarriere;
        });

        res.status(200).json(formattedCarrieres);
    } catch (error) {
        console.error("Erreur lors de la récupération des carrières:", error);
        res.status(500).json({ message: error.message });
    }
};

// Obtenir la carrière d'un employé spécifique
module.exports.getCarriereByEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const carriere = await Carriere.findOne({ employee: employeeId })
            .populate({
                path: 'employee',
                select: 'nom prenom email',
                model: 'Employe'
            })
            .lean();

        if (!carriere) {
            return res.status(404).json({ message: "Carrière non trouvée pour cet employé" });
        }

        // Transformer les données pour inclure les informations de l'employé
        const formattedCarriere = {
            ...carriere,
            employee: carriere.employee ? {
                _id: carriere.employee._id,
                nom: carriere.employee.nom,
                prenom: carriere.employee.prenom
            } : null,
            posteActuel: carriere.posteActuel ? {
                ...carriere.posteActuel,
                dateDebut: carriere.posteActuel.dateDebut.toISOString()
            } : null,
            mobilites: carriere.mobilites.map(mobilite => ({
                ...mobilite,
                date: mobilite.date.toISOString()
            })),
            competences: carriere.competences.map(competence => ({
                ...competence,
                dateAcquisition: competence.dateAcquisition.toISOString()
            })),
            createdAt: carriere.createdAt.toISOString(),
            updatedAt: carriere.updatedAt.toISOString()
        };

        // Formater les dates dans planCarriere si présent
        if (carriere.planCarriere) {
            formattedCarriere.planCarriere = {
                ...carriere.planCarriere,
                objectifs: carriere.planCarriere.objectifs.map(objectif => ({
                    ...objectif,
                    echeance: objectif.echeance.toISOString()
                }))
            };
        }

        res.status(200).json(formattedCarriere);
    } catch (error) {
        console.error("Erreur lors de la récupération de la carrière:", error);
        res.status(500).json({ message: error.message });
    }
};

// Créer une nouvelle carrière
module.exports.createCarriere = async (req, res) => {
    try {
        const {
            employee,
            posteActuel,
            competences,
            besoinsFormation,
            mobilites,
            planCarriere,
            evaluations
        } = req.body;

        // Vérifier si l'employé existe
        if (!employee) {
            return res.status(400).json({ message: "L'ID de l'employé est requis" });
        }

        const employeeExists = await Employe.findById(employee);
        if (!employeeExists) {
            return res.status(404).json({ message: "L'employé spécifié n'existe pas" });
        }

        // Vérifier si une carrière existe déjà pour cet employé
        const existingCarriere = await Carriere.findOne({ employee });
        if (existingCarriere) {
            return res.status(400).json({ message: "Une carrière existe déjà pour cet employé" });
        }

        const newCarriere = new Carriere({
            employee,
            posteActuel,
            competences,
            besoinsFormation,
            mobilites,
            planCarriere,
            evaluations
        });

        const savedCarriere = await newCarriere.save();
        const populatedCarriere = await Carriere.findById(savedCarriere._id)
            .populate({
                path: 'employee',
                select: 'nom prenom email',
                model: 'Employe'
            })
            .lean();

        // Transformer les dates en format ISO
        const formattedCarriere = {
            ...populatedCarriere,
            employee: populatedCarriere.employee ? {
                _id: populatedCarriere.employee._id,
                nom: populatedCarriere.employee.nom,
                prenom: populatedCarriere.employee.prenom
            } : null,
            posteActuel: {
                ...populatedCarriere.posteActuel,
                dateDebut: populatedCarriere.posteActuel.dateDebut.toISOString()
            },
            mobilites: populatedCarriere.mobilites.map(mobilite => ({
                ...mobilite,
                date: mobilite.date.toISOString()
            })),
            competences: populatedCarriere.competences.map(competence => ({
                ...competence,
                dateAcquisition: competence.dateAcquisition.toISOString()
            })),
            createdAt: populatedCarriere.createdAt.toISOString(),
            updatedAt: populatedCarriere.updatedAt.toISOString()
        };

        res.status(201).json(formattedCarriere);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour une carrière
module.exports.updateCarriere = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Si l'employé est mis à jour, vérifier qu'il existe
        if (updateData.employee) {
            const employeeExists = await Employe.findById(updateData.employee);
            if (!employeeExists) {
                return res.status(404).json({ message: "L'employé spécifié n'existe pas" });
            }
        }

        const updatedCarriere = await Carriere.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate({
            path: 'employee',
            select: 'nom prenom email',
            model: 'Employe'
        })
        .lean();

        if (!updatedCarriere) {
            return res.status(404).json({ message: "Carrière non trouvée" });
        }

        // Transformer les dates en format ISO
        const formattedCarriere = {
            ...updatedCarriere,
            employee: updatedCarriere.employee ? {
                _id: updatedCarriere.employee._id,
                nom: updatedCarriere.employee.nom,
                prenom: updatedCarriere.employee.prenom
            } : null,
            posteActuel: {
                ...updatedCarriere.posteActuel,
                dateDebut: updatedCarriere.posteActuel.dateDebut.toISOString()
            },
            mobilites: updatedCarriere.mobilites.map(mobilite => ({
                ...mobilite,
                date: mobilite.date.toISOString()
            })),
            competences: updatedCarriere.competences.map(competence => ({
                ...competence,
                dateAcquisition: competence.dateAcquisition.toISOString()
            })),
            createdAt: updatedCarriere.createdAt.toISOString(),
            updatedAt: updatedCarriere.updatedAt.toISOString()
        };

        res.status(200).json(formattedCarriere);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ajouter une compétence
module.exports.addCompetence = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, niveau, dateAcquisition } = req.body;

        const carriere = await Carriere.findById(id);
        if (!carriere) {
            return res.status(404).json({ message: "Carrière non trouvée" });
        }

        carriere.competences.push({ nom, niveau, dateAcquisition });
        await carriere.save();

        res.status(200).json(carriere);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ajouter un besoin de formation
module.exports.addBesoinFormation = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, description, priorite } = req.body;

        const carriere = await Carriere.findById(id);
        if (!carriere) {
            return res.status(404).json({ message: "Carrière non trouvée" });
        }

        carriere.besoinsFormation.push({ type, description, priorite });
        await carriere.save();

        res.status(200).json(carriere);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ajouter une mobilité
module.exports.addMobilite = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, ancienPoste, nouveauPoste, date, raison } = req.body;

        const carriere = await Carriere.findById(id);
        if (!carriere) {
            return res.status(404).json({ message: "Carrière non trouvée" });
        }

        carriere.mobilites.push({ type, ancienPoste, nouveauPoste, date, raison });
        await carriere.save();

        res.status(200).json(carriere);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour le plan de carrière
module.exports.updatePlanCarriere = async (req, res) => {
    try {
        const { id } = req.params;
        const { objectifs, cheminProgression } = req.body;

        const carriere = await Carriere.findById(id);
        if (!carriere) {
            return res.status(404).json({ message: "Carrière non trouvée" });
        }

        carriere.planCarriere = { objectifs, cheminProgression };
        await carriere.save();

        res.status(200).json(carriere);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ajouter une évaluation
module.exports.addEvaluation = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, type, note, commentaires } = req.body;

        const carriere = await Carriere.findById(id);
        if (!carriere) {
            return res.status(404).json({ message: "Carrière non trouvée" });
        }

        carriere.evaluations.push({ date, type, note, commentaires });
        await carriere.save();

        res.status(200).json(carriere);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 