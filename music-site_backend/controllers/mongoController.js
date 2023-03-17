const userModel = require("../models/userModel");
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");

exports.register = async function (req, res) {
  const user = req.body;
  if (user.password !== user.repeatpassword) {
    // password & repeat password checking
    return res.status(409).send({
      message: "Password and repeat password must match!",
    });
  }
  const newUser = new userModel({
    username: user.username,
    email: user.email,
    password: user.password,
    // todo add profile picture
  });
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
  console.log(user);
  const stringToken = uuidv4();
  user.token = stringToken;
  user.save();
  if (!user) {
    return res
      .status(401)
      .send({ message: "Username or email address is incorrect" });
  }
  if (req.body.password !== user.password) {
    return res.status(401).send({ message: "Password is incorrect" });
  }
  res.send({
    token: stringToken,
  });
  console.log(stringToken);
};
