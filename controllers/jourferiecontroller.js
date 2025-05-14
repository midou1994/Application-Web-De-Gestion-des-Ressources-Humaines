const jourferieModel = require('../models/jourferieSchema')
module.exports.getAllJourferie = async (req, res) => {
    try {
        const jourferieList = await jourferieModel.find();
        res.status(200).json(jourferieList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.addJourferie = async (req,res)=>{
    try {
        
        const { libelle,date,jour,nombre_de_jours,annee } = req.body;

        const newJourFerie = new jourferieModel({
            libelle,date,jour,nombre_de_jours,annee 
        })

        const jourferieadded = await newJourFerie.save()

        res.status(200).json(jourferieadded)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
module.exports.deletJourferieBYID = async (req,res)=>{
    try {
        const {id} = req.params
        console.log(id)
        await jourferieModel.findByIdAndDelete(id)

        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json(error.message)
    }
} 
module.exports.getJourferieBYID = async (req,res)=>{
    try {
        const {id} = req.params
        const jourferie = await jourferieModel.findById(id)

        res.status(200).json(jourferie)
    } catch (error) {
        res.status(500).json(error.message)
    }
} 
module.exports.updateJourferieBYID = async (req,res)=>{
    try {
        const {id}=req.params
        const {}=req.body
        
        await jourferieModel.findByIdAndUpdate(id,{
            $set: {libelle,date,jour,nombre_de_jours,annee}
        })

        const jourferie = await jourferieModel.findById(id)

        res.status(200).json(jourferie)
    } catch (error) {
        res.status(500).json(error.message)
    }
}