import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./api/routes/auth.js";
import usersRoute from "./api/routes/users.js";
import hotelsRoute from "./api/routes/hotels.js";
import roomsRoute from "./api/routes/rooms.js";
import cookieParser from "cookie-parser";


const app=express();

dotenv.config();

const connect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO); 
        console.log("Connect");
    }catch(error)
    { 
        throw error; 
    }
};



mongoose.connection.on("disconnected",()=>{
    console.log("disc");
})

app.use(cookieParser());
app.use(express.json()) 

app.use("/auth",authRoute);
app.use("/users",usersRoute);
app.use("/hotels",hotelsRoute);
app.use("/rooms",roomsRoute);

app.use((err,req,res,next)=>{
    const errorStatus=err.status||500
    const errorMessage=err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    });
   
});
 

app.listen(8800,()=>{
    connect();
    console.log("Success") ;
})