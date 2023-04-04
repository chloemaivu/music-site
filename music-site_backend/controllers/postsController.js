const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose")

const security = require("./securityController");
const playlistModel = require("../models/playlistModel");
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");

exports.getAllPosts = async function (req, res, next) {
    posts = await postModel.find().sort({ "updatedAt": -1 }).limit(5)
    if (!posts) {
        return (next(createError(404, "Posts not found.")))
    }
    res.status(200).send(posts)
}

exports.createPost = async function (req, res, next) {
    const user = await userModel.findById(req.body.userID)
    let UserID = ""

    if (!user) {
        return (next(createError(404, "User not found")))
    } else {
        UserID = "USERID::" + user._id
    }
    console.log(req.params.id)
    if (!req.params.id) {
        return (next(createError(404, "Post not found.")))
    }
    const playlist = await playlistModel.findById(req.params.id)
    if (!playlist) {
        res.status(404).send("No matching playlist found")
    }
    const playlistID = "PLAYLIST" + playlist._id
    const newPost = new postModel({
        userID: UserID,
        username: user.username,
        likes: [],
        comments: [],
        playlistID: playlistID,
        userPicture: user.picture
    })
    newPost.save().then(() => {
        res.status(200).send("Post created successfully!")
    })
}

exports.deletePost = async function (req, res, next) {
    const post = await postModel.findById(req.params.id)
    if (!post) {
        res.status(404).send("No matching post found")
    }
    if (!req.body.userID === post.userID) {
        res.status(401).send("You're not authorised to delete this post.")
    }
    post.deleteOne().save().then(() =>
        res.status(200).send("You've successfully removed the post."))
}

exports.addComment = async function (req, res, next) {
    const post = await postModel.findById(req.params.id)
    if(!post){
        res.status(404).send("No matching post found")
    }
    const combined = req.body.username + ": " + req.body.comment
    post.comment.push(combined)
    post.save().then(() => {
        res.status(200).send("Comment added successfully")
    })
}