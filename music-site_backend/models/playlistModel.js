const mongoose = require("mongoose")

const playlistSchema = new mongoose.Schema({
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
        unique: false,
        required: [true, "Username is required"],
        maxLength: [30, "Username must not exceed more than 30 characters"],
        minLength: [4, "Username must be longer than 4 characters."],
        title: "Username"
    },
    name: {
        type: String,
        unique: false,
        required: [true, "Playlists require a name"],
        minLength: [3, "The playlists name must be three characters or longer"],
        maxLength: [50, "The playlists name cannot be more than 50 characters"],
        title: "Playlists name"
    },
    description: {
        type: String,
        unique: false,
        title: "An optional description of the created playlist",
        minLength: [3, "The playlists description must be three characters or more"],
        maxLength: [280, "The playlists description cannot be more than 280 characters"]
    },
    uri: {
        type: Array,
        title: "SpotifyURI's",
        description: "An array of spotify uri's for tracks and albums",
        items: {
            type: String
        }
    }    
})

const playlistModel = mongoose.model("newPlaylist", playlistSchema, "userPlaylists");

module.exports = playlistModel;