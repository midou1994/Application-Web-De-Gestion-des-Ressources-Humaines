const mongoose = require("mongoose");
const jourferieSchema = new mongoose.Schema({
    libelle:  String, 
    date:  Date,
    jour: String,
    nombre_de_jours: String,
    annee: String,
  }, { timestamps: true });
  




const JourFerie = mongoose.model("JourFerie", jourferieSchema);
module.exports = JourFerie;