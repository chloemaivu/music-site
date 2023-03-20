const mongoose = require("mongoose");
// const bcrypt = require('bcryptjs');

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

///////////// BCRYPT STUFF - TODO LATER \\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// userSchema.pre('save', async function (next) {
//     try {
//         if (!this.isModified('password')) {
//             return next();
//         }
//         const salt = await bcrypt.genSalt(parseInt(process.env.PASSWORD_SALT_ROUNDS));
//         const hashed = await bcrypt.hash(this.password, salt);
//         this.password = hashed;
//         return next();
//     } catch (err) {
//         return next(err);
//     }
// });
// Hashing the password with bcrypt.js
// userSchema.pre('findOneAndUpdate', async function (next) {
//     try {
//         if (this._update.password) {
//             const salt = await bcrypt.genSalt(parseInt(process.env.PASSWORD_SALT_ROUNDS));
//             const hashed = await bcrypt.hash(this._update.password, salt);
//             this._update.password = hashed;
//         }
//         return next();
//     } catch (err) {
//         return next(err);
//     }
// });

// userSchema.method("validatePassword", async function (pass) {
//     return bcrypt.compare(pass, this.password);
// });

const userModel = mongoose.model("user", userSchema, "users");

module.exports = userModel;