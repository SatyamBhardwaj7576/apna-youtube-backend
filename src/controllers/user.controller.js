import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async(req,res)=>{
    res.status(200).json({
        message:"User registered"
    })
})

export { registerUser } 
//method to bna liya abbb isko run karne ke liye url hit hoga tbb naa
//aurr unn sare urls ko hmm routes me rakhte hain

