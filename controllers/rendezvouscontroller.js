const RendezVous = require('../models/rendezvousSchema')

         
exports.getAllRendezVous = async (req, res) => {
    try {
        const rendezvous = await RendezVous.find();
        res.status(200).json(rendezvous);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
    
exports.addRendezVous = async (req, res) => {
    try {
        const { type_entretient,nom,prenom,lieu,heure,date } = req.body;

        const newRendezVous = new RendezVous({
            type_entretient,nom,prenom,lieu,heure,date 
        });

        const rendezvousadded = await newRendezVous.save()

        res.status(200).json(rendezvousadded)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
