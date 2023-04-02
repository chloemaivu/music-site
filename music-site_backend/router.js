const express = require("express");
const router = express.Router()

const spotify = require("./controllers/spotifyController")
const mongo = require("./controllers/mongoController")

//Example: router.get('/book', books.index)
////////////////// MONGO REQUESTS \\\\\\\\\\\\\\

router.post("/auth/register", mongo.register)

router.post("/auth/login", mongo.login)

router.get("/user/:id", mongo.getUserData)

router.post("/createplaylist", mongo.createPlaylist)

router.post("/appendplaylist/", mongo.appendPlaylist)

router.get("/getplaylists/:id", mongo.getPlaylists)

router.post("/user/:id/update", mongo.updateUserData)

router.post("/user/:id/bio", mongo.setUserBio)

router.post("/user/:id/password", mongo.changeUserPassword)

////////////////// SPOTIFY REQUESTS \\\\\\\\\\\\\\

router.get("/spotify/:search&:type&:limit", spotify.search)

router.get("/spotify/artist/:uri", spotify.artist)

router.get("/spotify/album/:uri", spotify.album)

router.get("/spotify/albums/:arr", spotify.albums)

router.get("/spotify/tracks/:arr", spotify.tracks)

router.get("/spotify/lyrics/:uri", spotify.lyrics)

////////////////// BANDCAMP REQUESTS \\\\\\\\\\\\\\

////////////////// SOUNDCLOUD REQUESTS \\\\\\\\\\\\\\

module.exports = router;