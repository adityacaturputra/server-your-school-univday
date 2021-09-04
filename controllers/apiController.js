const University = require('../models/University')

module.exports = {
    getAllUniversities: async (req, res) => {
        try {
            const university = await University.find().select('_id contentId name imageId')
                .populate({path : 'contentId', select: '_id name jeroanKonten'})
                .populate({path : 'imageId', select: '_id imageUrl'})    
            res.status(200).json({university})
        } catch (error) {
            res.status(500).json({error})
        }
    },
}