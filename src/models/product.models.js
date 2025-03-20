import mongoose, { Schema } from "mongoose";


const productSchema=new Schema({
    productname:{
        type:String,
        require:true
    },
    detail:{
        type:String,
        require:true
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
})

export const Product=mongoose.model("Product",productSchema)
