const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        auto: true,
    },
    userID: {
        type: String,
        unique: false,
        title: "Users MongoDB ObjectID",
        description: "User ID. Originally auto asigned by MongoDB upon user creations, defined in userSchema and value stored in local storage"
    },
    username: {
        type: String,
        title: "Username corresponding to userID"
    },
    playlistName: {
        type: String,
        title: "Name of the connected playlist",
        minLength: [3, "The playlists name must be three characters or longer"],
        maxLength: [50, "The playlists name cannot be more than 50 characters"],
    },
    likes: {
        type: Array,
        title: "Likes",
        description: "An array of user IDs that have liked the post.",
        items: {
            type: String,
            minLength: [24, "Not a valid userID"],
            maxLength: [32, "Not a valid userID"]
        }
    },
    comments: {
        type: Array,
        title: "Comments",
        description: "An array of comments posted by users.",
        items: {
            type: String,
            minLength: [1, "Your comment is too short."],
            maxLength: [300, "Sorry, your comment must be shorter than 300."]
        }
    },
    playlistID: {
        type: String,
        unique: true,
        required: true,
        title: "User's playlist",
        description: "Relevant user's playlist that is being rated"
    },
    userPicture: {
        type: String,
        maxLength: [600, "Image URL must not exceed more than 600 characters"],
    }
}, { timestamps: true })

const postModel = mongoose.model("newPost", postSchema, "userPosts");

module.exports = postModel;

