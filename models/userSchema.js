const mongoose= require('mongoose')
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    nom : String,
    prenom: String,
    email: { type: String, require: true, unique: true },
    password: {type :String, require:true , minLength : 8 },
    role: {type : String, enum : ['Admin','ResponsableRH','Employe']},

    isActive : Boolean,
    connecte : Boolean,
    
},{timestamps:true});
userSchema.pre("save",async function(next){
    try {
        const salt = await bcrypt.genSalt()
        const User = this
        User.password = await bcrypt.hash(User.password,salt)
        User.isActive = false
        next()
    } catch (error) {
        next(error)
    }
})
userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email})
    if (user) {
        const auth = await bcrypt.compare(password,user.password)
        if (auth) {
            if(!user.isActive) {
                return user
            }
            throw Error("compte non activé")
            return user
        }
        throw Error("incorrect password")
    }
    throw Error("incorrect email")
}
const User = mongoose.model("user", userSchema);
module.exports = User;
