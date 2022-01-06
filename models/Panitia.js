const mongoose = require('mongoose');

const { ObjectId } = mongoose.SchemaTypes;

const panitiasSchema = new mongoose.Schema({
  divisionId: {
    type: ObjectId,
    ref: 'Division',
  },
  isDivisionLead: {
    type: Boolean,
  },
});
module.exports = mongoose.model('Panitia', panitiasSchema);
