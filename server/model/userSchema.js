const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId:{
        type: String,
        required: true,
        unique: true
    },
    displayName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},{timestamps:true});


const userdb = new mongoose.model("users",userSchema);

module.exports = userdb;