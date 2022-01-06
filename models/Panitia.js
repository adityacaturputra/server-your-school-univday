const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const ObjectId = mongoose.SchemaTypes.ObjectId

const usersSchema = new mongoose.Schema({
    divisionId: {
        type: ObjectId,
        ref: 'Division'
    },
    isDivisionLead: {
        type: Boolean 
    }
})

usersSchema.pre('save', async function(next) {
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
})

module.exports = mongoose.model('Users', usersSchema)