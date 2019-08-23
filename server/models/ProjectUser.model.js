const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectUserSchema = new Schema({
    title: { type: String, required: false },
    description: { type: String, required: false },
    public: {type: Boolean, required: false, default: false},
    topic: {type: String, required: false},
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
    user: {type: String},
    tweetsArray: []
}, { timestamps: true })

const ProjectUser= mongoose.model('ProjectUser', projectUserSchema)
module.exports = ProjectUser