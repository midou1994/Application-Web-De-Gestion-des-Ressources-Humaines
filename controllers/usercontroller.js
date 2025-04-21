const userModel = require('../models/userSchema')
module.exports.getAllUsers = async (req,res)=>{
    try {
        
        const userList = await userModel.find()

        res.status(200).json(userList)
    } catch (error) {
        res.status(500).json(error.message)
    }
} 
module.exports.addemploye = async (req,res)=>{
    try {
        
        const {nom, prenom,email,password}=req.body
        const role="employe"
    
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
        
        const {nom, prenom,email,password}=req.body
        const role="responsable RH"
    
        const newUser = new userModel({
            nom, prenom,email,password,role
        })

        const useradded = await newUser.save()

        res.status(200).json(useradded)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
module.exports.addadmin = async (req,res)=>{
    try {
        
        const {nom, prenom,email,password}=req.body
        const role="admin"
    
        const newUser = new userModel({
            email,password,role
        })

        const useradded = await newUser.save()

        res.status(200).json(useradded)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
