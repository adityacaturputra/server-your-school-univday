const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  priorityLevel: {
    type: Number,
  },
  imageId: {
    type: ObjectId,
    ref: 'Image',
  },
  contentId: [{
    type: ObjectId,
    ref: 'Content',
  }],
});

module.exports = mongoose.model('University', universitySchema);
