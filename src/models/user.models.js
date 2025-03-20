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
        unique:true,
    },
    fullname:{
        type:String,
        required:true,
    },
    coverimage:{
        type:String,
        required:true,

    },
    address:{
        type:String,
        required:type
    }
})

export const User=mongoose.model("User",userSchema)