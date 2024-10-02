import { z } from "zod";
import jwt from "../config";
import auth from "..middleware";

const express = require("express");
const router = express.Router();

const signupSchema = z.object({
    username:z.string() ,
    password:z.string() ,
    Firstname:z.string(),
    Lastname: z.string(),
  });

router.post("/singup", async(req,res)=>{
    const body = req.body();
    const {success} = signupSchema.safeParse(body);
    if (!success){
        return res.json({
            message : "Incorrect inputs"
        })
    }

    const existingUser = await user.findOne({
        username : body.username
    })

    if (existingUser){
        return res.json({
            message : "User already exist!"
        })
    }

    const dbUser = await user.create({
        username : body.username,
        password : body.username,
        Firstname : body.username,
        Lastname : body.username,
    });

    const token = jwt.signup({
        userId : dbUser._id
    },jwt);

    res.json({
        message : "User created!",
        token :token
    })
})

const signinSchema = z.object({
    username : z.string ,
    password : z.string
})

router.post("/signin",async(req,res)=>{
    const body = req.body();
    const {success} = signinSchema.safeParse(body);
    
    if(!success){
        res.json({
            message : "Incorrect Inputs"
        })
    }

    const existingUser = await user.findOne({
        username : req.body.username,
        password : req.body.password,
    })

    if(!existingUser){
        res.json({
            message : "Sorry You are not our existing user"
        })
    }else{
        const token = jwt.signin({
            userId : user._id
        },jwt)
        res.json({
            message :"Welcome Back!",
            token : token
        })
        return ;
    }
})

const Upadateuser = z.object({
    password:z.string() ,
    Firstname:z.string(),
    Lastname: z.string(),
  });
router.put("/",auth,async (req,res)=>{
    const body = req.body();
    const {success} = Upadateuser.safeParse(body);

    if(!success){
        res.status(411).json({
            message : "Error while updating information"
        })
    }

    await user.upadateOne({ _id : req.userId }, req.body);

    res.status(200).json({
        message : "Updated successfully"
    })
})

router.get("/bulk",async(req,res)=>{
    const filter = req.query.filter || "";

    const users = await Use.find({
        $or:[{
            Firstname:{
                "$regex" : filter
            },
            Lastname:{
                "$regex" : filter
            }
        }]
    })
    res.json({
        username:users.username,
        Firstname:users.Firstname,
        Lastname:users.Lastname,
        _id : users._id
    })
})
module.exports = router;
