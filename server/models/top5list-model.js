const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerEmail: { type: String },
        publisher: { type: String },
        comments: { type: [[String, String]] },
        isPublished: { type: Number },
        views: { type: Number },
        likes: { type: Number },
        dislikes: { type: Number }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
