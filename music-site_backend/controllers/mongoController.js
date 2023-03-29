const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose")

const security = require("./securityController");
const playlistModel = require("../models/playlistModel");
const userModel = require("../models/userModel");

///////////////////// USER DATA POSTS \\\\\\\\\\\\\\\\\\\\

exports.register = async function (req, res) {
  const user = req.body;
  if (user.password !== user.repeatpassword) {
    // password & repeat password checking
    return res.status(409).send({
      message: "Password and repeat password must match!",
    });
  }
  const hashedPass = await security.hashPass(user.password)
  const newUser = new userModel({
    username: user.username,
    email: user.email,
    password: hashedPass,
    picture: user.picture
    // registerDate: Date()
  });
  console.log(newUser)
  newUser.save().then((user) => {
    res.status(200).send(user);
  });
};

exports.login = async function (req, res) {
  if (req.body.username) {
    user = await userModel.findOne({ username: req.body.username });
  }
  if (req.body.email) {
    user = await userModel.findOne({ email: req.body.email });
  }
  const hashedPass = await security.comparePass(req.body.password, user.password)
  console.log(user, hashedPass);
  const stringToken = uuidv4();
  user.token = stringToken;
  user.save();
  if (!user) {
    return res
      .status(401)
      .send({ message: "Username or email address is incorrect" });
  }
  if (hashedPass !== true) {
    return res.status(401).send({ message: "Password is incorrect" });
  }
  res.send({
    token: stringToken,
    id: user._id
  });
  console.log(stringToken, user._id);
};

/////////////////////// USER DATA GETS \\\\\\\\\\\\\\\\\\\\\\\\\

exports.getUserData = async function (req, res, next) {
  if (!req.params.id) {
    return(next(createError(502, "Bad request: id not found in request header")))
  }
  user = await userModel.findById(req.params.id);
  if (!user) {
    return (next(createError(404, "User not found")))
  }
  res.send(userData = ({
    email: user.email,
    isAdmin: user.isAdmin,
    picture: user.picture,
    username: user.username,
    registrationDate: user._id.getTimestamp().toString().slice(4,15)
  }))
}

/////////////////////// CONTENT POSTS \\\\\\\\\\\\\\\\\\\\

exports.createPlaylist = async function (req, res) {
  const playlistData = req.body
  const user = await userModel.findById(req.body.id)
  const UserID = "USERID::" + user.id

  const newPlaylist = new playlistModel({
    userID: UserID,
    username: user.username,
    name: playlistData.name,
    description: playlistData.description,
    uri: []
  })
  console.log(newPlaylist)
  newPlaylist.save().then((playlistData) => {
    res.status(200).send("Playlist created successfully!")
  })
}

exports.appendPlaylist = async function (req, res) {
  const id = {
    name: req.body.id
  }
  console.log(req.body.uri)
  const playlist = await playlistModel.findOne(id)
  if (!playlist) {
    res.status(404).send("No matching playlist found")
  }
  console.log(playlist)
  playlist.uri.push(req.body.uri)
  playlist.save().then(() => {
    res.status(200).send("Successfully added track / album to playlist!")
  })
}

//////////////////////// CHANGE USER DATA \\\\\\\\\\\\\\\\\\\\\\\\\\\\

exports.updateUserData = async function (req, res, next) {
  console.log(req.params)
  if (!req.params.id) {
    return(next(createError(502, "Bad request: id not found in request header")))
  }
  user = await userModel.findById(req.params.id);
  if (!user) {
    return(next(createError(404, "User not found")))
  }
  user.username = req.body.username;
  user.email = req.body.email;
  user.picture = req.body.picture;
  await user.save()
  res.send("User data updated successfully")
}

exports.changeUserPassword = async function (req, res, next) {
  console.log(req.params)
  console.log(req.body)
  if (!req.params.id) {
    return(next(createError(502, "Bad request: id not found in request header")))
  }
  user = await userModel.findById(req.params.id);
  if (!user) {
    return(next(createError(404, "User not found")))
  }
  const hashedPass = await security.comparePass(req.body.current, user.password)
  if (!hashedPass || hashedPass === false) {
    return(next(createError(401, "Error validating current password")))
  }
  user.password = await security.hashPass(req.body.update);
  await user.save();
  res.send("Password changed successfully")
}
