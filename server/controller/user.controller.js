const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
require('dotenv').config();

module.exports.register = (req, res) => {
    console.log("This comes from Register")
    console.log(process.env.FIRST_SECRET_KEY)
    User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({
                id: user._id
            }, process.env.FIRST_SECRET_KEY);
            res
                .cookie("usertoken", userToken, {
                    httpOnly: true
                })
                .json({ msg: "success!", user: user });
        })
        .catch(err => res.status(300).json(err));
}

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}
module.exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
        return res.status(401).json({ errors: { email: { message: "User Does Not Exist" } } });
    }
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if (!correctPassword) {
        return res.status(401).json({ errors: { password: { message: "Password is not correct" } } });
    }
    const userToken = jwt.sign({ id: user._id }, process.env.FIRST_SECRET_KEY);
    res.cookie("usertoken", userToken, { httpOnly: true });
    res.status(200).json({ msg: "success!" });
};
