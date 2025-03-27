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
