const mongoose = require('mongoose');

const { ObjectId } = mongoose.SchemaTypes;

const schedulesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  timeStartDate: {
    type: Date,
    required: true,
  },
  timeEndDate: {
    type: Date,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  universityId: {
    type: ObjectId,
    ref: 'University',
  },
});

module.exports = mongoose.model('Schedule', schedulesSchema);
