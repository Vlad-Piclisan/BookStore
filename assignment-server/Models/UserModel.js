const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: { required: true, type: String },
    lastName: { required: true, type: String },
    author: { required: true, type: String },
    email: { required: true, type: String, unique: true },
    password: { required: true, type: String, minLength: [4, "Password is too short"] },
    isAdmin:{type:Boolean}
});

const User = mongoose.model('User', userSchema);
module.exports = User;