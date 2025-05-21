const demandecongeModel = require('../models/demandecongeSchema')
module.exports.getAllDemandescoge = async (req, res) => {
    try {
        const demandecongeList = await demandecongeModel.find();
        res.status(200).json(demandecongeList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.addDemandesconge = async (req, res) => {
    try {
        const { date_debut, date_fin, type_conge, employe } = req.body;
        
        // Validation des dates
        const startDate = new Date(date_debut);
        const endDate = new Date(date_fin);
        if (startDate >= endDate) {
            return res.status(400).json({ message: "La date de fin doit être après la date de début" });
        }

        // Calcul du nombre de jours
        const timeDiff = endDate.getTime() - startDate.getTime();
        const nombre_jrs = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

        const newDemande = new demandecongeModel({
            date_debut: startDate,
            date_fin: endDate,
            nombre_jrs,
            type_conge,
            employe,
            etat_conge: "En attente"
        });

        const savedDemande = await newDemande.save();
        res.status(201).json(savedDemande);

    } catch (error) {
        res.status(500).json({ 
            message: "Erreur serveur",
            error: error.message 
        });
    }
};
module.exports.deletDemandescongeBYID = async (req,res)=>{
    try {
        const {id} = req.params
        console.log(id)
        await demandecongeModel.findByIdAndDelete(id)

        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json(error.message)
    }
} 
module.exports.getDemandecongeBYID = async (req,res)=>{
    try {
        const {id} = req.params
        const demandeconge = await DemandeConge.findById(id)

        res.status(200).json(demandeconge)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
module.exports.updateDemandecongeBYID = async (req,res)=>{
    try {
        const {id}=req.params
        const {date_debut,date_fin,nombre_jrs,type_conge}=req.body
        
        await demandecongeModel.findByIdAndUpdate(id,{
            $set: {date_debut,date_fin,nombre_jrs,type_conge}
        })

        const demandeconge = await demandecongeModel.findById(id)

        res.status(200).json(demandeconge)
    } catch (error) {
        res.status(500).json(error.message)
    }
} 
module.exports.updateStatutById = async (req, res) => {
    try {
        const { id } = req.params;
        const { etat_conge } = req.body;

        const updated = await demandecongeModel.findByIdAndUpdate(id, {
            etat_conge
        }, { new: true });

        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

module.exports.getDemandescogeByEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const demandes = await demandecongeModel.find({ employe: employeeId });
        res.status(200).json(demandes);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};
