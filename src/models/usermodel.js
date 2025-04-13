const mongoose = require('mongoose')

const { Schema, model} = mongoose

const UserSchema = new Schema({
    firstname: String,
    lastname : String,
    email : String,
    password : String,
    phonenumber: String,
   profilepic:String,
    role : {
        type: String,
        enum : ["Manager", "Principle", "Teacher", "User", "General"]
    }, 
    profilePic : String
}, {timeStamps:true})

const User = model("User", UserSchema)

module.exports = User

