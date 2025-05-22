const FicheEntretient = require('../models/ficheentretientSchema');

module.exports.getAllFicheEntretient = async (req, res) => {
    try {
        const ficheentretients = await FicheEntretient.find();
        res.status(200).json(ficheentretients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports.addFicheEntretient = async (req, res) => {
    try {
        const {  recruteur, technique_evaluation, communication_evaluation, motivation_evaluation, preparation_evaluation, commantaire_recruteur,note, decicsion } = req.body;

        const newFicheEntretient = new FicheEntretient({
              recruteur, technique_evaluation, communication_evaluation, motivation_evaluation, preparation_evaluation, commantaire_recruteur,note, decicsion
        });

        const ficheentretientadded = await newFicheEntretient.save()

        res.status(200).json(ficheentretientadded)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
module.exports.deletFicheEntretientBYID = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        await FicheEntretient.findByIdAndDelete(id)

        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json(error.message)
    }
}
module.exports.getFicheEntretientBYID = async (req, res) => {
    try {
        const { id } = req.params
        const ficheentretient = await FicheEntretient.findById(id)

        res.status(200).json(ficheentretient)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
module.exports.updateFicheEntretientBYID = async (req, res) => {
    try {
        const { id } = req.params
        const { date_entretient, lieu, recruteur, technique_evaluation, communication_evaluation, motivation_evaluation, preparation_evaluation, commantaire_recruteur,note, decicsion } = req.body

        await FicheEntretient.findByIdAndUpdate(id, {
            $set: { date_entretient, lieu, recruteur, technique_evaluation, communication_evaluation, motivation_evaluation, preparation_evaluation, commantaire_recruteur,note, decicsion }
        })

        const ficheentretient = await FicheEntretient.findById(id)

        res.status(200).json(ficheentretient)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
