import mongoose, { Schema } from "mongoose";

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    fullname:{
        type:String,
        required:true,
    },
    coverimage:{
        type:String,
    },
    address:{
        type:String,
        required:true,
    }
},{timestamps:true});

export const User=mongoose.model("User",userSchema)