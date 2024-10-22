import mongoose, { Schema, Types } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      //cloudenery url use karenge
      type: String,
      required: true,
    },
    coverImage: {
      //cloudenery url use karenge
      type: String,
      required: true,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "pasword is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

//password ko encrypt karne me help karega 
//pre ke andar arrow function use nhi kar skate bcoz arrow function me hm this ko call nhi kar payenge
userSchema.pre("save",async function(next){
    //agrr modify hua hoga password tabhi pre wala hook call hoga
    if(!this.isModified("password"))return next();
     this.password = await bcrypt.hash(this.password,10)
    next()

})

//password to encrypt kar diya lekin wo to alag form me hai
//abb check kar lenge ki shi hai ki nhi
userSchema.methods.isPasswordCorrect = async function (password){
return await bcrypt.compare(password, this.password)
  
}

userSchema.methods.generateAccessToken =  function(){
 return   jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateRefreshToken =  function(){
    return   jwt.sign({
        _id: this._id,
       
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
    
}




export const User = mongoose.model("User", userSchema);
