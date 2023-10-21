const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
require('dotenv').config();


// const getToken =(user)=>{
//     const payload = {
        
//     }
// }

module.exports.register = (req, res) => {
    console.log("This comes from Register")
    console.log(process.env.FIRST_SECRET_KEY)
    User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({
                id: user._id,
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
    res.status(200).json({ msg: "success!",userId:user._id,name: user.name });
};


module.exports.getAllUsers = (request, response) => {
    User.find({}).sort({ name: 'asc' })
        .then(persons => {
            response.json(persons);
        })
        .catch(err => {
            response.json(err)
        })
}

module.exports.updateUser = (request, response) => {
    Product.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(user => response.json(user))
        .catch(err => response.json(err))
  }

  
module.exports.deleteUser = (request, response) => {

    User.findOne({ _id: request.params.id })
        .then(person =>
            person.role == "teacher" ? User.deleteOne({ _id: request.params.id }) //note: "id" here MUST match id in corresponding route
                .then(deleteConfirmation => {
                    return User.findOneAndUpdate({ role: "student" }, { role: "teacher" }, { new: true })
                        .then(updatedPerson => response.json(updatedPerson))
                        .catch(err => response.json(err))
                })
                .catch(err => response.json(err)) :
                User.deleteOne({ _id: request.params.id }) //note: "id" here MUST match id in corresponding route
                    .then(deleteConfirmation => response.json(deleteConfirmation))
                    .catch(err => response.json(err)


                    ))
        .catch(err => response.json(err));

}

module.exports.getUser = (request, response) => {
    User.findOne({ _id: request.params.id })
        .then(person => response.json(person))
        .catch(err => response.json(err));
}