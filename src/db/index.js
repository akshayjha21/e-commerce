import dotenv from 'dotenv';
dotenv.config();
const DB_NAME="E-commerce";
import mongoose from 'mongoose';
console.log(process.env.MONGODB_URL)
const connectDB=async () => {
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log("Connected to MongoDb : ",connectionInstance.connection.host);
    } catch (error) {
        console.log("mongodbconnection error",error)
        process.exit(1)
    }   
}
export {connectDB}