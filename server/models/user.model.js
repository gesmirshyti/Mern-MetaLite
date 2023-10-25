const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
name: { type: String ,
    required:[true,"Name is required"]},
email: { type: String,
    required:[true,"Email is required"] ,
    validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email"
    } },
password: { type: String,
        required:[true,"Password is required"] },
userId : { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
}, 
description:{type:String},
userImage: {type:String}
}, { timestamps: true });


UserSchema.virtual('confirmPassword')
.get( () => this._confirmPassword )
.set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});
UserSchema.pre('save', function(next) {
bcrypt.hash(this.password, 10)
    .then(hash => {
    this.password = hash;
    next();
    });
});


module.exports = mongoose.model('User', UserSchema);
