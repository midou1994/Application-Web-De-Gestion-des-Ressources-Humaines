const Employe = require('../models/employeSchema')


module.exports.getAllEmployes = async (req, res) => {
    try {
        const employeList = await Employe.find();
        res.status(200).json(employeList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.addEmployes = async (req,res)=>{
    try {
        
        const { matricule, nom, prenom, cin, date_naissance, adresse, telephone, post, photo } = req.body;

        const newEmploye = new Employe({
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
        await Employe.findByIdAndDelete(id)

        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json(error.message)
    }
} 
exports.getEmployesBYID = async (req, res) => {
    try {
        const employe = await Employe.findById(req.params.id);
        if (!employe) return res.status(404).json({ message: 'Employé non trouvé' });
        res.status(200).json(employe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.updateEmployesBYID = async (req,res)=>{
    try {
        const {id}=req.params
        const {nom, prenom, adresse, telephone,post, photo}=req.body
        
        await Employe.findByIdAndUpdate(id,{
            $set: {nom, prenom, adresse, telephone,post, photo}
        })

        const employe = await Employe.findById(id)

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
      employeData.photo = filename; 
    } else {
      file = "img.webp"
      employeData.photo = file; 
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
  module.exports.updateEmployeWithImage = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      updateData.photo = req.file.filename;
    }

    const updatedEmploye = await Employe.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedEmploye) {
      return res.status(404).json({ message: "Employé introuvable" });
    }

    res.status(200).json(updatedEmploye);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  module.exports.getEmployeByUserId = async (req, res) => {
  try {
    const employe = await Employe.findOne({ user: req.params.userId });

    if (!employe) {
      return res.status(404).json({ message: "Aucun employé trouvé pour cet utilisateur" });
    }

    res.status(200).json(employe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
