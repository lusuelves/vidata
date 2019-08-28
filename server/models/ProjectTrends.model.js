const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectTrendsSchema = new Schema({
    title: { type: String, required: false },
    description: { type: String, required: false },
    public: {type: Boolean, required: false, default: false},
    topic: {type: String, required: false},
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
    place: {type: String},
    trendsArray: [{type: Object}],
    likes: {type: Number, default: 0},
    coments: [{type: String}]
}, { timestamps: true })

const ProjectTrends= mongoose.model('ProjectTrends', projectTrendsSchema)
module.exports = ProjectTrends