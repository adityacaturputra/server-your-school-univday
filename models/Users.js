/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { ObjectId } = mongoose.SchemaTypes;

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  universityId: {
    type: ObjectId,
    ref: 'University',
  },
  contactId: {
    type: ObjectId,
    ref: 'Contact',
  },
});

const hashPasswordatPreSave = async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
};

usersSchema.pre('save', hashPasswordatPreSave);

module.exports = mongoose.model('Users', usersSchema);
