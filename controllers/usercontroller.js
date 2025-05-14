const userModel = require('../models/userSchema')
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports.getAllUsers = async (req,res)=>{
    try {
        
        const userList = await userModel.find()

        res.status(200).json(userList)
    } catch (error) {
        res.status(500).json(error.message)
    }
} 
module.exports.addEmploye = async (req,res)=>{
    try {
        
        const {nom, prenom,email,password,role}=req.body

        

        const newUser = new userModel({
            nom, prenom,email,password,role
        })

        const useradded = await newUser.save()

        res.status(200).json(useradded)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
module.exports.addResponsableRH = async (req,res)=>{
    try {
        
        const {nom, prenom,email,password,role}=req.body
        
    
        const newUser = new userModel({
            nom, prenom,email,password,role
        })

        const useradded = await newUser.save()

        res.status(200).json(useradded)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
module.exports.addAdmin = async (req,res)=>{
    try {
        
        const {nom, prenom,email,password}=req.body
        const role="Admin"
    
        const newUser = new userModel({
            email,password,role
        })

        const useradded = await newUser.save()

        res.status(200).json(useradded)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
module.exports.deletusersBYID = async (req,res)=>{
    try {
        const {id} = req.params
        console.log(id)
        await userModel.findByIdAndDelete(id)

        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json(error.message)
    }
} 
module.exports.getuserBYID = async (req,res)=>{
    try {
        const {id} = req.params
        const user = await userModel.findById(id)

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error.message)
    }
} 
module.exports.updatePassword = async (req,res)=>{
    try {
        const {id}=req.params
        const {password}=req.body
        
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password,salt)
        
        const user = await userModel.findByIdAndUpdate(id,{
            $set: {password : hashPassword}
        })

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
module.exports.updateUser = async (req,res)=>{
    try {
        const {id}=req.params
        const {nom,prenom}=req.body
        
        await userModel.findByIdAndUpdate(id,{
            $set: {nom,prenom}
        })

        const user = await userModel.findById(id)

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const createToken = (id) => {
  return jwt.sign({ id }, "jwt token SECRET", { expiresIn: "1m" }); // tu peux changer la durée ici
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifie que les champs sont fournis
    if (!email || !password) {
      return res.status(400).json({ message: "Veuillez fournir l'email et le mot de passe." });
    }

    // Tente la connexion via la méthode statique du modèle
    const user = await userModel.login(email, password);

    // Vérifie si le compte est activé
    if (!user.isActive) {
      return res.status(403).json({ message: "Votre compte n'est pas encore activé." });
    }

    // Met à jour l'état de connexion
    await userModel.findByIdAndUpdate(user._id, {
      $set: { connecte: true }
    });

    // Génère un token JWT
    const token = createToken(user._id);

    // Envoie le cookie JWT (valable 1 min ici)
    res.cookie("jwt_token", token, {
      httpOnly: true,
      maxAge: 60 * 1000, // 1 minute en millisecondes
      sameSite: "Lax"
    });

    // Succès
    res.status(200).json({ message: "Connexion réussie.", user });

  } catch (error) {
    console.error("Erreur login :", error.message);

    // Gestion des erreurs spécifiques
    if (error.message === "incorrect email") {
      return res.status(401).json({ message: "Coordonnées incorrect." });
    }
    if (error.message === "incorrect password") {
      return res.status(401).json({ message: "Coordonnées incorrect." });
    }
    if (error.message === "compte non activé") {
      return res.status(403).json({ message: "Compte non activé." });
    }

    // Erreur serveur par défaut
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};


module.exports.logout = async (req,res)=>{
    try {
        const id = req.user._id 
        console.log(id)
        const connecte = false
        const user = await userModel.findByIdAndUpdate(id,{
            $set: {connecte}
        })
        console.log(user)
        res.cookie("jwt_token","",{httpOnly:true,maxAge:1})
        
        res.status(200).json("disconnect success")
    } catch (error) {
        res.status(500).json({message:error.message})
    }   
}