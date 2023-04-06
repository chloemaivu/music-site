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
