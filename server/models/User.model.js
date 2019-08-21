const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    profilePic: {type: String},
    posts: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    postsTopics: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
module.exports = User