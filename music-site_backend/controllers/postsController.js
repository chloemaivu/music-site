const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose")

const security = require("./securityController");
const playlistModel = require("../models/playlistModel");
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");

exports.getAllPosts = async function (req, res, next) {
    posts = await postModel.find().sort({ "updatedAt": -1 }).limit(10)
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
        return res.status(404).send("No matching playlist found")
    }
    if (playlist.privacy === true) {
        return res.status(200).send("This playlist is private. No post created")
    }
    const playlistID = "PLAYLIST" + playlist._id
    const newPost = new postModel({
        userID: UserID,
        username: user.username,
        playlistName: playlist.name,
        likes: [],
        comments: [],
        playlistID: playlistID,
        userPicture: user.picture
    })
    newPost.save().then(() => {
        res.status(200).send("Post created successfully!")
    })
}

exports.deletePost = async function (req, res) {
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

exports.addComment = async function (req, res) {
    const post = await postModel.findById(req.params.id)
    if(!post){
        return  res.status(404).send("No matching post found")
    }
    const combined = req.body.username + ": " + req.body.comment
    post.comments.push(combined)
    console.log(post)
    post.save().then(() => {
        return res.status(200).send("Comment added successfully")
    })
}

exports.deleteComment = async function (req, res) {
    const admin = await userModel.findById(req.body.userID)
    if (!admin) {
        return res.status(404).send("User not found")
    }
    if (admin.isAdmin === false) {
        return res.status(502).send("Bad request. Unauthorised")
    }
    const post = await postModel.findById(req.params.id)
    if (!post) {
        return res.status(404).send("Post not found")
    }
    post.comments.remove(req.body.comment)
    post.save().then(() => {
        res.status(200).send("Comment successfully removed")
      });

}

exports.likePost = async function (req, res) {
    const likeCheck = await postModel.findOne({ _id: req.params.id, likes: req.body.userID })
    if (likeCheck) {
        console.log("cannot like a post more than once")
        return res.status(200).send("Cannot like a post more than once")
    }
    const post = await postModel.findById(req.params.id)
    if (!post) {
        return res.status(404).send("No matching post found")
    }
    post.likes.push(req.body.userID)
    post.save().then(() => {
        res.status(200).send("Post liked successfully")
    })
}