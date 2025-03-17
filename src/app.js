import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app=express();

//using a cors middleware to allow only the desired website to acess the server

app.use(
    cors({
        origin:process.env.CORS_ORIGIN,
        credentials:true,
    })
)

//common middlewares
app.use(express.json({limit:"16kb"}));//enable to post request of maximum 16kb
app.use(express.urlencoded({extended:true,limit:"16kb"}));//enable to post request of maximum 16kb of form data
app.use(cookieParser());//enable to get cookies->stores info about login credentials etc
export {app}