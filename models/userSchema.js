const mongoose= require('mongoose')
const userSchema = new mongoose.Schema({
    nom : String,
    prenom: String,
    E_mail : { type: String, require: true, unique: true },
    password: {type :String, require:true , minLength : 8 },
    role: {type : String, enum : ['admin','Responsable RH','employé']},
    
})
const User = mongoose.model("User", userSchema);
module.exports = User;