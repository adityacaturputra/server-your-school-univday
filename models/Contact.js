const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  contact: {
    type: String,
  },
});
module.exports = mongoose.model('Panitia', contactSchema);
