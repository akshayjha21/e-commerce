//multer can be used as a middleware for file handling through routes ....can be used in the form format where user will upload some files and then we have to handle the file for storage,error handling etc.

import multer from "multer";
import path from "path";

//we have defined the storage for the file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {//giving the filename by timestamp and random numbers to avoid duplications
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

  //checking the file type
  const fileFilter=(req,file,cd)=>{
    const filetypes= /jpeg|png|jpg/;//file types which are allowed
    const mimetype=filetypes.test(file.mimetype);//check the content of the file
    const extname=filetypes.test(path.extname(file.originalname));//check the extension of the file either it's a jpeg jpg or png format
    if(mimetype&&extname){//checking both the conditions if they exist then return the file or show an error
        return cd(null,true);
    }
    else{
        cd(new Error("only image are allowed"))
    }
  };

  export const upload=multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // Limit file size to 5MB
  })

