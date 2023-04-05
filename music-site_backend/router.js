const express = require("express");
const router = express.Router()

const spotify = require("./controllers/spotifyController")
const mongo = require("./controllers/mongoController")
const posts = require("./controllers/postsController")

////////////////// MONGO REQUESTS \\\\\\\\\\\\\\

router.post("/auth/register", mongo.register)

router.post("/auth/login", mongo.login)

router.get("/user/:id", mongo.getUserData)

router.post("/deleteuser/:id", mongo.deleteUser)

router.post("/createplaylist", mongo.createPlaylist)

router.post("/appendplaylist/", mongo.appendPlaylist)

router.post("/highlightplaylist/:id", mongo.highlightPlaylist)

router.post("/deletetrack/:id", mongo.deleteTrack)

router.get("/getplaylists/:id", mongo.getPlaylists)

router.get("/getallplaylists", mongo.getAllPlaylists)

router.post("/user/:id/update", mongo.updateUserData)

router.post("/user/:id/bio", mongo.setUserBio)

router.post("/user/:id/password", mongo.changeUserPassword)

////////////////// COMMUNITY CONTENT REQUESTS \\\\\\\\\\\\\\

router.get("/getallposts", posts.getAllPosts)

router.post("/createpost/:id", posts.createPost)

router.post("/deletepost/:id", posts.deletePost)

router.post("/post/:id/addcomment", posts.addComment)

router.post("/post/:id/like", posts.likePost)

////////////////// SPOTIFY REQUESTS \\\\\\\\\\\\\\

router.get("/spotify/:search&:type&:limit", spotify.search)

router.get("/spotify/artist/:uri", spotify.artist)

router.get("/spotify/album/:uri", spotify.album)

router.get("/spotify/albums/:arr", spotify.albums)

router.get("/spotify/tracks/:arr", spotify.tracks)

router.get("/spotify/lyrics/:uri", spotify.lyrics)

module.exports = router;