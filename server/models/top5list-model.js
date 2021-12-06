const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerEmail: { type: String },
        publisher: { type: String },
        comments: { type: [Object] },
        isPublished: { type: Boolean },
        views: { type: Number },
        likes: { type: [String] },
        dislikes: { type: [String] },
        isCommunity: { type: Boolean },
        communityItems: { type: [Object] },
        published: { type: String }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
