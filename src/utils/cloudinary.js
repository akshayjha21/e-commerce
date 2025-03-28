//the question arises that why do we use cloudinary 
/*
    here is the workflow of using cloudinary and multer

   ? User profile pictures ---> Multer first stores the image locally ---> Cloudinary uploads it ---> Local file is deleted

*/
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import  dotenv from "dotenv";

dotenv.config();
//configuring the cloudinary

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_name:process.env.CLOUDINARY_API_KEY,
    api_key:process.env.CLOUDINARY_API_SECRET
})

import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import dotenv from 'dotenv';
dotenv.config();

// Configure cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadcloudinary = async (localfilepath) => {
    try {
        if (!localfilepath) return null;
        const response = await cloudinary.uploader.upload(
            localfilepath, {
                resource_type: "auto",//video audio image
            }
        );
        console.log("File uploaded to Cloudinary. File URL: " + response.url);
        // Once the file is uploaded, delete it from the server
        fs.unlinkSync(localfilepath);
        return response;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        if (fs.existsSync(localfilepath)) {
            fs.unlinkSync(localfilepath);
        }
        return null;
    }
};

export { uploadcloudinary };
