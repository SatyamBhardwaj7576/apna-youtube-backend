// require('dotenv').config({path:'./env'})
//dusri approach

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";


dotenv.config({
  path: "./.env",
});



connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error :", error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed !!! :", error);
  });

//********************* ye phli approach hai hmm aise bhi kar skate hain
//    but aise me index file thoda jayda hi bulky ho gyi hai isliye dusri approach thodi bettr approach hai */

//sabse phle mongoose important hai whi database se connect karega
//yahan prr index file ke andar hi sbb kch ekk sath akr diya

//import mongoose from "mongoose";

//database ko connect kar liya but uska naam bhi to chahiye ki kaun sa karna hai
//import {DB_NAME} from "./constants"

//app ko bhi yhin prr bna lete hai
//app to express ke through connect hoga

// import express from "express";

// const app = express();

// //database ko do tarike se connect kar sakte hain
// //pehla approach

// //ekk function bna liya aurr firr usi ko call kar liya
// // function connectDB(){}

// // connectDB()

// //abb hmm chlkte hain better approach ke taraf
// //hamne javascrift me padha tha  ify usi ka use karenge
// //errow function bna ke usi kop turat call kar lenge

// (async () => {
//   try {
//    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//    //app listen express ka PART hai
//    app.on("error" , (error)=>{
//     console.log("Error :", error)
//     throw error
//    })
//    app.listen(process.env.PORT, ()=>{
//     console.log(`App is listening on port ${process.env.PORT}`);
//    })
//   } catch (error) {
//     console.error("Error :", error);
//     throw error
//   }
// })();
