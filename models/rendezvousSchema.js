const mongoose = require("mongoose");

const rendezVousSchema = new mongoose.Schema({
    type_entretien: String,
    nom: String,
    prenom: String,
    lieu: String,
    heure: String,
    date: String
    


}, { timestamps: true });

module.exports = mongoose.model("RendezVous", rendezVousSchema);
