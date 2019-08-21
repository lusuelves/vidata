const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    title: { type: String, required: false },
    description: { type: String, required: false },
    imageUrl: { type: String, required: false },
    public: {type: Boolean, required: false, default: false},
    topic: {type: String, required: false},
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

const Project= mongoose.model('Project', projectSchema)
module.exports = Project