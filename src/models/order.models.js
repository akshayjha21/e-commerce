import mongoose from "mongoose";

const order=new Schema({
    userId:{type:String,required:true},
    
})

export const Order=mongoose.model("Order",order)