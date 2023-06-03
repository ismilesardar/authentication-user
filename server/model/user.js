/**
 * Date: 03/06/2023
 * Subject: Auth project
 * Auth: Ismile Satdar
**/

//third-parity module require
const mongoose = require('mongoose');
const {Schema} = mongoose;
//user schema
const userSchema  = new Schema({
    name:{
        type: String,
        trim:true,
        required: true,
    },
    email:{
        type: String,
        trim: true,
        required: [true, "Please add email"],
        unique: true,
        match: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "please enter a valid emile"],
    },
    password:{
        type: String,
        required: [true, "password is Required!"],
        trim: true,
        minLength: [6, "password must be up 6 characters"],
    },
    role:{
        type: Number,
        trim: true,
        default: 0,
    }
},
{
    timestamps:false,
    versionKey:false
});

//create Users model
const Users = mongoose.model('users', userSchema);
//Users Schema exports
module.exports = Users;