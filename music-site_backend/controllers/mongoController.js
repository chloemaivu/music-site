const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose")

const security = require("./securityController");
const playlistModel = require("../models/playlistModel");
const userModel = require("../models/userModel");
const postModel = require("../models/postModel")

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

exports.deleteUser = async function (req, res, next) {
  console.log(req.body)
  const admin = await userModel.findById(req.body.userID)
  if (!admin) {
    return (next(createError(404, "User not found")))
  }
  const hashedPass = await security.comparePass(req.body.password, admin.password)
  if (!hashedPass) {
    return res.status(502).send("Invalid user credentials")
  }
  const user = await userModel.findOneAndRemove({
    username: req.body.id,
    createdAt: req.body.createdAt
  })
  const userID = "USERID::" + user.id
  console.log(userID)
  // postModel.deleteMany(filter={userID: userID})
  await userModel.findOneAndRemove({
    username: req.body.id,
    createdAt: req.body.createdAt
  })
  return res.status(200).send("You've successfully deleted the user.")
}

/////////////////////// USER DATA GETS \\\\\\\\\\\\\\\\\\\\\\\\\

exports.getUserData = async function (req, res, next) {
  if (!req.params.id) {
    return (next(createError(502, "Bad request: id not found in request header")))
  }
  user = await userModel.findById(req.params.id);
  if (!user) {
    return (next(createError(404, "User not found")))
  }
  res.send(userData = ({
    bio: user.bio,
    createdAt: user.createdAt,
    email: user.email,
    isAdmin: user.isAdmin,
    picture: user.picture,
    username: user.username,
    updatedAt: user.updatedAt
  }))
}

exports.getPlaylists = async function (req, res, next) {
  // console.log(req.params.id)
  const id = req.params.id
  let filter = {}
  if (!id) {
    return (next(createError(502, "Bad request: id not found in request header")))
  }
  if (id.length === 32) {
    // console.log("id is 32 char")
    filter = { userID: id }
  } else if (id.length === 24) {
    // console.log(" id is 24 chars")
    filter = { _id: id }
  } else if (typeof id === "string") {
    filter = { name: id }
  }
  playlists = await playlistModel.find(filter)
  if (!playlists) {
    return (next(createError(404, "playlists not found")))
  }
  // console.log(playlists)
  res.status(200).send(playlists)
}

exports.getAllPlaylists = async function (req, res, next) {
  playlists = await playlistModel.find().sort({ "updatedAt": -1 }).limit(15)
  if (!playlists) {
    return (next(createError(404, "Playlist not found.")))
  }
  return res.status(200).send(playlists)
}

/////////////////////// CONTENT POSTS \\\\\\\\\\\\\\\\\\\\

exports.createPlaylist = async function (req, res) {
  const playlistData = req.body
  const user = await userModel.findById(req.body.id)
  const UserID = "USERID::" + user.id

  let isPrivate = false
  if (req.body.privacy === "private") {
    isPrivate = true
  }
  const newPlaylist = new playlistModel({
    userID: UserID,
    username: user.username,
    name: playlistData.name,
    description: playlistData.description,
    privacy: isPrivate,
    uri: [],
    highlighted: false
  })
  // console.log(newPlaylist)
  newPlaylist.save().then(() => res.status(200).send(newPlaylist))
}

exports.appendPlaylist = async function (req, res) {
  const playlist = await playlistModel.findById(req.body.id)
  if (!playlist) {
    console.log("No matching playlist found")
    return res.status(404).send("No matching playlist found")
  }
  playlist.uri.push(req.body.uri)
  playlist.save().then(() => {
    return res.status(200).send("Successfully added track / album to playlist!")
  })
}

exports.highlightPlaylist = async function (req, res) {
  const playlist = await playlistModel.findById(req.params.id)
  if (!playlist) {
    console.log("No matching playlist found")
    return res.status(404).send("No matching playlist found")
  }
  const user = await userModel.findById(req.body.userID)
  if (user.isAdmin === false) {
    return res.status(502).send("Bad request. Only admins can highlight playlists")
  }
  if (playlist.privacy === true) {
    console.log("playlist is private")
    return res.status(502).send("Bad request: You cannot highlight a private playlist")
  }
  if (playlist.highlighted === false) {
    playlist.highlighted = true;
  } else if (playlist.highlighted === true) {
    playlist.highlighted = false;
  }
  console.log(playlist)
  playlist.save().then(() => {
    return res.status(200).send("Playlist updated successfully")
  })
}

exports.deletePlaylist = async function (req, res) {
  const playlist = await playlistModel.findById(req.params.id)
  const playlistUserID = playlist.userID.slice(8, 32)
  if (!playlist) {
    return res.status(404).send("Playlist not found")
  }
  const user = await userModel.findById(req.body.userID)
  if (!user) {
    console.log("user not found")
    return res.status(404).send("User not found")
  }
  if (user._id != playlistUserID) {
    console.log("not authorised")
    return res.status(502).send("Bad request. You are not authorised to delete this playlist")
  }
  const playlistID = "PLAYLIST" + playlist._id

  if (playlist.privacy === false) {
    const post = await postModel.findOne({ playlistID: playlistID })
    if (!post) {
      return res.status(404).send("Post not found")
    }
    post.deleteOne()
  }
  playlist.deleteOne()

  return res.status(200).send("Playlist removed successfully")
}

exports.deleteTrack = async function (req, res, next) {
  const playlist = await playlistModel.findById(req.params.id)
  if (!playlist) {
    console.log("No matching playlist found")
    return res.status(404).send("No matching playlist found")
  }
  console.log(playlist)
  if (!req.body.userID === playlist.userID) {
    return res.status(500).send("Bad request, unauthorised call")
  }
  playlist.uri.remove(req.body.trackURI)
  playlist.save().then(() => {
    res.status(200).send("Track successfully removed from playlist")
  });
}

//////////////////////// CHANGE USER DATA \\\\\\\\\\\\\\\\\\\\\\\\\\\\

exports.updateUserData = async function (req, res, next) {
  console.log(req.params)
  if (!req.params.id) {
    return (next(createError(502, "Bad request: id not found in request header")))
  }
  user = await userModel.findById(req.params.id);
  if (!user) {
    return (next(createError(404, "User not found")))
  }
  user.username = req.body.username;
  user.email = req.body.email;
  user.picture = req.body.picture;
  await user.save()
  res.send("User data updated successfully")
}

exports.setUserBio = async function (req, res, next) {
  if (!req.params.id) {
    return (next(createError(502, "Bad request: id not found in request header")))
  }
  user = await userModel.findById(req.params.id);
  console.log(user)
  if (!user) {
    return (next(createError(404, "User not found")))
  }
  user.bio = req.body.bio;
  console.log(user.bio)
  await user.save()
  res.send(req.body.bio)
}

exports.changeUserPassword = async function (req, res, next) {
  console.log(req.params)
  console.log(req.body)
  if (!req.params.id) {
    return (next(createError(502, "Bad request: id not found in request header")))
  }
  user = await userModel.findById(req.params.id);
  if (!user) {
    return (next(createError(404, "User not found")))
  }
  const hashedPass = await security.comparePass(req.body.current, user.password)
  if (!hashedPass || hashedPass === false) {
    return (next(createError(401, "Error validating current password")))
  }
  user.password = await security.hashPass(req.body.update);
  await user.save();
  return res.send("Password changed successfully")
}
