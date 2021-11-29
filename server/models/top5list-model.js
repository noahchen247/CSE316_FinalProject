const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerEmail: { type: String },
        publisher: { type: String },
        comments: { type: [[String, String]] },
        isPublished: { type: int },
        views: { type: int },
        likes: { type: int },
        dislikes: { type: int }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
