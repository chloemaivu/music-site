const userModel = require("../models/userModel");
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const security = require("./securityController")

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

exports.getUserData = async function (req, res, next) {
  console.log(req.params.id)
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
  console.log(userData)
}

exports.updateUserData = async function (req, res, next) {
  console.log(req.params)
  if (!req.params.id) {
    return(next(createError(502, "Bad request: id not found in request header")))
  }
  user = await userModel.findById(req.params.id);
  if (!user) {
    return(next(createError(404, "User not found")))
  }
  console.log(user)
}

exports.changeUserPassword = async function (req, res, next) {
  console.log(req.params)
  if (!req.params.id) {
    return(next(createError(502, "Bad request: id not found in request header")))
  }
}
