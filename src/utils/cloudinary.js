//Actually hmm jo path follow kar rhe hain uske a/q
//cloudinary prrr hmm apne local server se file upload karenge
//file sabse pehle hamare local server prr upload hogi firr uska url
//cloudinary ko deke upload karenge finally
//upload karne ke baad local server se file ko remove kar denge
//ye approach industry level approach hai isliye ye better hai isi liye iska use karo

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//ekk accha se method bna lete hain uska

const uploadOnCloudinary = async (localFilePath) => {
  console.log(localFilePath);
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log(response);
    //file uploaded successfully
    // console.log("file is uploaded successfully on cloudinary", response.url);

    //abb upload hone ke baad isko unlik kar dete hain
    fs.unlinkSync(localFilePath);

    //ye response user ke liye return kiya hai
    console.log(response);
    return response;
   
  } catch (error) {
    fs.unlinkSync(localFilePath);
    //remove the locally saved temproary file as
    // the upload operation got failed
    console.error(error);
  }
};

export { uploadOnCloudinary };
