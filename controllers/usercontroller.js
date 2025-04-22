const userModel = require('../models/userSchema')
const bcrypt=require("bcrypt")
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
        
        const {nom, prenom,email,password,age}=req.body

        const role = "Employe"

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
        const {id} = req.param
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