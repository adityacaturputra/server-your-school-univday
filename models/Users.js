const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const ObjectId = mongoose.SchemaTypes.ObjectId

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    universityId: {
        type: ObjectId,
        ref: 'University'
    },
    panitiaId: {
        type: Boolean
    },
    contact: {
        type: String
    }
})

usersSchema.pre('save', async function(next) {
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
})

module.exports = mongoose.model('Users', usersSchema)