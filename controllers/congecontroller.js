const congeModel = require('../models/congeSchema')
module.exports.getAllconge = async (req, res) => {
    try {
        const congeList = await congeModel.find();
        res.status(200).json(congeList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};