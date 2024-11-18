const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
   title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    numViews: {
        type: Number,
        default: 0,
    },
    isLiked: {
        type: Boolean,
        default: false,
    },
    isDisliked: {
        type: Boolean,
        default: false,
    },
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    dislikes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    image: {
        type: String,
        default: "https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?q=80&w=3418&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://cdn.pixabay.com/photo/2024/09/25/18/57/forest-8081959_1280.jpg",
    },
}, {toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true});

module.exports = mongoose.model("Blog", blogSchema);