const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const contentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  jeroanKonten: {
    type: String,
    required: true,
  },
  universityId: {
    type: ObjectId,
    ref: 'University',
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },

});

module.exports = mongoose.model('Content', contentSchema);
