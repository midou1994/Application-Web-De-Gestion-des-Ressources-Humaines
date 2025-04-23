const mongoose = require("mongoose");
const congeSchema = new mongoose.Schema({

date_debut: Date,
date_fin: Date, 
nombre_jrs: String,

}, { timestamps: true });


const Conge = mongoose.model("Conge", congeSchema);
module.exports = Conge;