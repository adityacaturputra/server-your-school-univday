const University = require('../models/University');
const Schedule = require('../models/Schedule');

module.exports = {
  getAllUniversities: async (req, res) => {
    try {
      const university = await University.find().select('_id contentId name imageId')
        .populate({ path: 'contentId', select: '_id name jeroanKonten' })
        .populate({ path: 'imageId', select: '_id imageUrl' });
      res.status(200).json({ university });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  getAllSchedule: async (req, res) => {
    try {
      const schedule = await Schedule.find().select('_id name universityId timeStartDate timeEndDate')
        .populate({
          path: 'universityId',
          select: '_id name imageId',
          populate: { path: 'imageId', select: '_id imageUrl' },
        });
      res.status(200).json({ schedule });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
