const Candidat = require('../models/candidatschema');

module.exports.getAllCandidats = async (req, res) => {
    try {
        const candidatList = await Candidat.find();
        res.status(200).json(candidatList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports.addCandidats = async (req,res)=>{
    try {
        
        const { nom,prenom,email,cin,date_naissance,adresse,telephone,post,niveau_etude,experience,cv,lettre_motivation,diplome,annee_obtention} = req.body;

        const newCandidat = new Candidat({
            nom,prenom,email,cin,date_naissance,adresse,telephone,post,niveau_etude,experience,cv,lettre_motivation,diplome,annee_obtention 
        })

        const candidatadded = await newCandidat.save()

        res.status(200).json(candidatadded)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
module.exports.deletCandidatsBYID = async (req,res)=>{
    try {
        const {id} = req.params
        console.log(id)
        await Candidat.findByIdAndDelete(id)

        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json(error.message)
    }
} 
exports.getCandidatsBYID = async (req, res) => {
    try {
        const candidat = await Candidat.findById(req.params.id);
        if (!candidat) return res.status(404).json({ message: 'Candidat non trouvé' });
        res.status(200).json(candidat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};  
module.exports.updateCandidatsBYID = async (req,res)=>{
    try {
        const {id}=req.params
        const {nom, prenom, email, cin, date_naissance, adresse, telephone, post,niveau_etude,experience,cv,lettre_motivation,diplome,annee_obtention}=req.body
        
        await Candidat.findByIdAndUpdate(id,{
            $set: {nom, prenom, email, cin, date_naissance, adresse, telephone, post,niveau_etude,experience,cv,lettre_motivation,diplome,annee_obtention}
        })

        const candidat = await Candidat.findById(id)

        res.status(200).json(candidat)
    } catch (error) {
        res.status(500).json(error.message)
    }
}