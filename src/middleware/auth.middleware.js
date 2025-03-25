import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import apierror from "..utils/apierror.js"
import {asynchandler} from "../utils/asynchandler.js"


//verifying if the token exist or not
export const verifyJWT=asynchandler (async(req,_,next)=>{
    const token=req.cookies.acessToken||req.header("Authorization")?.replace("Bearer","")
    if(!token){
        return new apierror (404,"unauthorized")}
    
    try{
        // decodig the token

        const decodeToken=jwt.verify(token,process.env.Acess_Token_Secret)
        const user=await User.findById(decodeToken?._id).select("-password -refreshToken")
        if(!user){
            throw new apierror(401,"unauthorized")
        }
        req.user=user
        next()
    }
    catch (error) {
        throw new apierror(401,error?.message||"Invalid access token") 
        
     }
})