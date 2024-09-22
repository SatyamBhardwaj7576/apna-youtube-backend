import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//frontend se data grab karne ke liye

//jbb data kisi form bagera ke rooop me denge 
app.use(express.json({limit:"16kb"}));

//jbb data url ke form me denge 
app.use(express.urlencoded({extended: true , limit:"16kb"}));

//kch data ko hmm aise hii apne server prr hi rakhna chahte hain
app.use(express.static("public"))

//cookie parser ka use user ke server ke through read hone wala cookie easily ho jaye 
//cookie-parser helps your server read cookies sent by clients.

app.use(cookieParser());

export { app };
