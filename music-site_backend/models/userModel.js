const mongoose = require("mongoose");

/*unique is not validation, use Model.on for validation
        https://mongoosejs.com/docs/faq.html */ 

const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    maxLength: [30, "Username must not exceed more than 30 characters"],
    minLength: [4, "Username must be longer than 4 characters." ]
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    maxLength: [100, "Password must not exceed more than 100 characters"],
    minLength: [8, "Password must be more than 8 characters"],
  },
  picture: {
    type: String,
    maxLength: [600, "Image URL must not exceed more than 600 characters"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  registrationDate: {
    type: Date,
    timestamps: true
  },
  token: {
    type: String,
    default: "new_user",
  },
});

const userModel = mongoose.model("user", userSchema, "users");

module.exports = userModel;