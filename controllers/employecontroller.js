const employeModel = require('../models/employeSchema')


module.exports.getAllEmployes = async (req, res) => {
    try {
        const employeList = await employeModel.find();
        res.status(200).json(employeList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.addEmployes = async (req,res)=>{
    try {
        
        const { matricule, nom, prenom, cin, date_naissance, adresse, telephone, post, photo } = req.body;

        const newEmploye = new employeModel({
            matricule, nom, prenom, cin, date_naissance, adresse, telephone, post, photo 
        })

        const employeadded = await newEmploye.save()

        res.status(200).json(employeadded)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
module.exports.deletEmployesBYID = async (req,res)=>{
    try {
        const {id} = req.params
        console.log(id)
        await employeModel.findByIdAndDelete(id)

        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json(error.message)
    }
} 
module.exports.getEmployesBYID = async (req,res)=>{
    try {
        const {id} = req.params
        const employe = await employeModel.findById(id)

        res.status(200).json(employe)
    } catch (error) {
        res.status(500).json(error.message)
    }
} 
module.exports.updateEmployesBYID = async (req,res)=>{
    try {
        const {id}=req.params
        const {nom, prenom, adresse, telephone,post, photo}=req.body
        
        await employeModel.findByIdAndUpdate(id,{
            $set: {nom, prenom, adresse, telephone,post, photo}
        })

        const employe = await employeModel.findById(id)

        res.status(200).json(employe)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
module.exports.addEmployeWithImage = async (req, res) => {
  try {
    const employeData = {
      ...req.body,
    };

    if (req.file) {
      const { filename } = req.file;
      console.log('Fichier reçu :', filename);
      employemployeData.photo = filename; 
    }

    const employe = new Employe(employeData);
    const addedEmploye = await employe.save();
  
      res.status(200).json({ addedEmploye });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const jwt = require("jsonwebtoken")

  const createToken=(id) => {
    return jwt.sign({id},'net 9antra25 secret',{expiresIn : '1m'})
  }