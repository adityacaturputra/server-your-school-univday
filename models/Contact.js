const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  contact: {
    type: String,
  },
  universityId: {
    type: ObjectId,
    ref: 'University',
  },
  userId: {
    type: ObjectId,
    ref: 'Users',
  },
});
module.exports = mongoose.model('Contact', contactSchema);
