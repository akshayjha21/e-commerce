import mongoose, { Schema } from "mongoose";


const productSchema=new Schema({
    productname:{
        type:String,
        required:true
    },
    detail:{
        type:String,
        required:true
    },
    productprice:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
    }
},{timestamps:true});

export const Product=mongoose.model("Product",productSchema)
