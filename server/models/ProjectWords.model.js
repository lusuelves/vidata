const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectWordsSchema = new Schema({
    title: { type: String, required: false },
    description: { type: String, required: false },
    public: {type: Boolean, required: false, default: false},
    topic: {type: String, required: false},
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
    textsArray: [{type: String}],
    placesArray: [],
    retweetsArray: [],
    likesArray: [],
    word: String
}, { timestamps: true })

const ProjectWords= mongoose.model('ProjectWords', projectWordsSchema)
module.exports = ProjectWords