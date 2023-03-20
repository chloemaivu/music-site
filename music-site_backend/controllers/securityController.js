const bcrypt = require('bcryptjs')

exports.hashPass = async function (password) {
    try {
        const salt = parseInt(process.env.BCRYPT_SALT_ROUNDS)
        const hashed = await bcrypt.hash(password, salt)
        return hashed;
    } catch (err) {
        return err;
    };
}

exports.comparePass = async function (password, hashedPass) {
    try {
        const passComp = await bcrypt.compare(password, hashedPass)
        return passComp;
    } catch (err) {
        return err;
    };
}


// const bcrypt = require('bcryptjs');

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

// userSchema.pre('findOneAndUpdate', async function (next) {
//     try {
//         if (this._update.password) {
            // const salt = await bcrypt.genSalt(parseInt(process.env.PASSWORD_SALT_ROUNDS));
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
