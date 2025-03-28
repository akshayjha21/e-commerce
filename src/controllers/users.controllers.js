 /*
    ### **🔄 Authentication Flow (Concise Version)**  

    1️⃣ **Register User (`registerUser`)**  
    - Validate input, check for existing user.  
    - Upload avatar & cover image to Cloudinary.  
    - Save user to DB, return user data.  

    2️⃣ **Login User (`loginUser`)**  
    - Find user by email/username.  
    - Verify password, generate tokens.  
    - Store refresh token, set cookies.  

    3️⃣ **Refresh Access Token (`refreshAcessToken`)**  
    - Verify refresh token, check DB match.  
    - Generate & return new tokens.  

    4️⃣ **Logout (`logoutUser`)**  
    - Remove refresh token from DB.  
    - Clear cookies.  

    5️⃣ **Change Password (`changeCurrentPassword`)**  
    - Verify old password, update to new one.  

    6️⃣ **Get Current User (`getCurrentUser`)**  
    - Return user details from `req.user`.  

    7️⃣ **Update Account (`UpdateAccountdetails`)
    - Update fullname & email in DB.  

    8️⃣ Update Avatar (`UpdateUserAvatar`)
    - Upload new avatar, update in DB.  

    9️⃣ **Update Cover Image (`UpdateUserCoverImage`) 
    - Upload new cover image, update in DB.  

    ### **🔑 Token Flow**
    - **Login** → Generates `accessToken` & `refreshToken`.  
    - **Use accessToken** → Access protected routes.  
    - **Refresh accessToken** → When expired, use `refreshToken`.  
    - **Logout** → Clears tokens from DB & cookies.  

    🔥 **Efficient, Secure, Scalable.** 🚀
 */


import { apierror } from "../utils/apierror.js";
import { asynchandler } from"../utils/asynchandler.js";
import { cloudinary } from "../utils/cloudinary.js";
import { apiresponse } from "../utils/apiresponse.js";
import { User } from "../models/user.js";

//generating acess token

const generateAccessandRefereshToken=async(userId)=>{
   try{
      const user=await User.findById(userId);
      //checking if the user exist or not
      if(!user){
         throw new apierror(404,"user not found");
      }
      //generating tokens for that particular user
      const acessToken=user.generateAcessToken();
      const refreshToken=user.generateRefreshToken();

      user.refreshToken=refreshToken;
      //saving everything
      await user.save({validateBeforeSave:false})

      //returning the tokens
      return{refreshToken,acessToken}
   }
   catch(error){
      console.log("error in accessing the tokens ",error)
      throw new apierror(500,"internal server error");
   }
}
//now registering the user

const registerUser=asynchandler(async(req,res)=>{
   //extracting the details
   const{fullname,password,email,username}=req.body;

   // Log the request body and files for debugging
   console.log("Request Body:", req.body);
   console.log("Request Files:", req.files);

   //validating if all the fields are there or not
   if(!([fullname,email,password,username].some((field)=>field?.trim()===""))){
      throw new apierror(401,"All fields are required")
   }
   //validation if the user exists or not
   const existeduser= await User.findOne({
      $or:[{email},{password}]
   })
   if(existeduser){
      throw new apierror(402,"user already exist")
   }
}) 