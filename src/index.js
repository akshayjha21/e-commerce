import {app} from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
dotenv.config(
    {
        path:"./.env"
    }
);
connectDB()
.then(()=>{
    const PORT=process.env.PORT||8021

    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`);
    })
} 
)
.catch((err)=>{
    console.log("connection to mongodb failed",err)
})

