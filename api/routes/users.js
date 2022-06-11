
import express from "express";
import User from "../models/User.js";
import {createUser,updateUser,deleteUser,getUser,getUsers} from "../controllers/user.js"
import { verifyToken ,verifyUser,verifyAdmin} from "../utils/verifyToken.js";
const router=express.Router();

/*
router.get("/checkauthentication",verifyToken,(req,res,next)=>{
    res.send("hello user")
})

router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
    res.send("hello user you are logged in")
})

router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
    res.send("hello admin you are logged in")
})  */
//Create
router.post("/",createUser);

//UPDATE
router.put("/:id", verifyUser,updateUser)

//DELETE
router.delete("/:id",verifyUser,deleteUser)

//GET
router.get("/:id",verifyUser, getUser)

//GET ALL
router.get("/",verifyAdmin, getUsers);
export default router;