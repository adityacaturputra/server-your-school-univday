const Item = require('../models/Item')
const Treasure = require('../models/Activity')
const Traveler = require('../models/Member')
const Category = require('../models/Category')
const Bank = require('../models/Bank')
const Booking = require('../models/Booking')
const University = require('../models/University')
const Content = require('../models/Content')

module.exports = {
    getAllUniversities: async (req, res) => {
        try {
            const university = await University.find().select('_id contentId name imageId')
                .populate({path : 'contentId', select: '_id name jeroanKonten'})
                .populate({path : 'imageId', select: '_id imageUrl'})    
            res.status(200).json({university})
        } catch (error) {
            
        }
    },
}