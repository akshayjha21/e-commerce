import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()
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
    },
    
},{timestamps:true});

//So before saving the user's login detail in mongodb we should check if the password that the user has given is correct or not so for this we will apply the middleware of mongoose here

userSchema.pre("save",async function(next){
    //?next() is used in middleware functions like pre("save", callback). It tells Mongoose to move to the next step in the middleware chain.

    if(!this.isModified("password")) return next()
    this.password= await bcrypt.hash(this.password,10);next();
})

userSchema.methods.ispasswordcorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}
//generating the acess token

userSchema.method.generateAcessToken=function(){
    return jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email,
        fullname:this.fullname
    })
},process.env.Acess_Token_Secret
{expiresIn:process.env.Acess_Token_Time}
// A token is a small piece of data used for authentication and security in web applications. It acts like a digital key that proves a user's identity.

userSchema.methods.generateRefreshToken=function(){
    //short lived access token
    return jwt.sign({ 
       _id:  this.id,
    }, process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
  );  
}

export const User=mongoose.model("User",userSchema)