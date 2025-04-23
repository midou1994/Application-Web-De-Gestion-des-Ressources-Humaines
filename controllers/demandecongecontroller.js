const demandecongeModel = require('../models/demandecongeSchema')
module.exports.getAllDemandescoge = async (req, res) => {
    try {
        const demandecongeList = await demandecongeModel.find();
        res.status(200).json(demandecongeList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.addDemandesconge = async (req,res)=>{
    try {
        
        const { date_debut,date_fin,nombre_jrs,type_conge,etat_conge,matricule } = req.body;

        const newDemandeConge = new demandecongeModel({
            date_debut,date_fin,nombre_jrs,type_conge,etat_conge,matricule
        })

        const demandecongeadded = await newDemandeConge.save()

        res.status(200).json(demandecongeadded)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
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