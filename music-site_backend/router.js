const express = require("express");
const router = express.Router()

const spotify = require("./controllers/spotifyController")
const mongo = require("./controllers/mongoController")

//Example: router.get('/book', books.index)
////////////////// MONGO REQUESTS \\\\\\\\\\\\\\

router.post("/auth/register", mongo.register)

router.post("/auth/login", mongo.login)

////////////////// SPOTIFY REQUESTS \\\\\\\\\\\\\\

router.get("/spotify/:search&:type&:limit", spotify.search)

////////////////// BANDCAMP REQUESTS \\\\\\\\\\\\\\

////////////////// SOUNDCLOUD REQUESTS \\\\\\\\\\\\\\


module.exports = router;