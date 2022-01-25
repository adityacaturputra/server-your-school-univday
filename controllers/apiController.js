const University = require('../models/University');
const Schedule = require('../models/Schedule');
const Contact = require('../models/Contact');

module.exports = {
  getAllUniversities: async (req, res) => {
    try {
      let university = await University.find().select('_id contentId name imageId')
        .populate({ path: 'contentId', select: '_id name jeroanKonten createdAt' })
        .populate({ path: 'imageId', select: '_id imageUrl' });
      university = university.sort((a, b) => b.priorityLevel - a.priorityLevel);

      res.status(200).json({ university });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  getUniversity: async (req, res) => {
    try {
      const { id } = req.params;
      const university = await University.findById(id).select('_id contentId name imageId')
        .populate({ path: 'contentId', select: '_id name jeroanKonten createdAt' })
        .populate({ path: 'imageId', select: '_id imageUrl' });
      res.status(200).json({ university });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  getAllSchedule: async (req, res) => {
    try {
      const schedule = await Schedule.find().select('_id name universityId timeStartDate timeEndDate place')
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
  getAllContactPerson: async (req, res) => {
    try {
      const contact = await Contact.find().select('_id name contact position');
      res.json(contact);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
