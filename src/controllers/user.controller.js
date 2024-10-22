import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { upload } from "../middlewares/multer.middleware.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req,res)=>{
    // res.status(200).json({
    //     message:"User registered"
    // })

  //jbb user register karega to kya kya chahiye
  //get user details from frontend
  // validation -not empty
  //check if user already exist ,username ,email
  //upload them to cloudinary , avatar
  //create user object -  creating entry in database
  //remove password and refresh token field from response
  //check for user creation
  //return response 

  const {fullName, email,username , password} = req.body;
  console.log("email :",email);
  console.log("req.body->",req.body);
  
//isse bsss full name check kiye hain
//Aise hi tmm bohot sare if else laga ke sab kch check kar sakte ho
//   if(fullName === ""){
//     throw new ApiError(400 , "full name is required");
    
//   } agrr aise likhoge to bohot sare if else loop likhna padega 
// Agrr beginner ho to likh sakte hai

if([fullName,email,username,password].some((field)=>
field?.trim()==="")){
    throw new ApiError(400,"All fields are required");
}

//abb user check karne ka tarika 

//database alag continent me hota hai 
//usko lane me dair lage gii isliye  use await
const existedUser = await  User.findOne({
    $or : [{username},{email}]
})

if(existedUser){
    throw new ApiError(409 ,"User with email or username already exists")
}

//image bagera bhi dekh lete hain

const avatarLocalPath = req.files?.avatar[0]?.path;
//const coverImageLocalPath = req.files?.coverImage[0]?.path;
let coverImageLocalPath;
if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path;
}

console.log("req.files",req.files);

if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required ")
}

//Abb image ko cloudinary prr upload karenge 

const avatar = await uploadOnCloudinary(avatarLocalPath)
const coverImage = await uploadOnCloudinary(coverImageLocalPath)

console.log("avataar local path ->",avatarLocalPath);

if(!avatar){
    throw new ApiError(400,"Avatar file is required ");
}

//object bnao aurr database me entry maar do

const user = await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "" ,
    email,
    password,
    username : username.toLowerCase()
})

const createdUser = await User.findById(user._id).select(
    " -password -refreshToken"
)

console.log("user._id = " , user._id);

if(!createdUser){
    throw new ApiError(500,"Something is wrong while registering user")
}

//finally response ko return karenge 

return res.status(201).json(
    new ApiResponse(200, createdUser,"User registered successfully")
)

})

export { registerUser } 
//method to bna liya abbb isko run karne ke liye url hit hoga tbb naa
//aurr unn sare urls ko hmm routes me rakhte hain

