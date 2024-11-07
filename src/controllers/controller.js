const User = require("../../schema/models/user_model");
const ContactForm =require("../../schema/models/contact_model");
const CycleInfo = require("../../schema/models/cycle_info_model")
const bcrypt= require("bcryptjs");


// index page
const home =async(req,res)=>{
    try{
        res.status(200).send("welcome to home page")

    }catch(error){
        console.log(error);
    }
}


// registration form
const registeration=async(req,res)=>{
    try{
      
        const {username, email, phone, password}=req.body;

        const userExist = await User.findOne({email:email});

        if(userExist){
            return res.status(400).json({msg:"email already exists"});
        }

        const userCreated= await User.create({username, email, phone, password});

        res.status(200 ).json({messgae:userCreated,
        token: await userCreated.generateToken(),
        userId:userCreated._id.toString(),
        })

    }catch(error){
        console.log("error:",error)
        res.status(500).json("some error occurred")
    }
}


// login form
const login=async(req,res)=>{
    try{
        const {email, password}=req.body;
        const userExist= await User.findOne({email});

        if(!userExist){
            return res.status(400).json({message:"Inavalid Credentials"});
        }

        const ifPassword = await userExist.comparePassword(password);

        if(ifPassword){
            res.status(200).json({
                message:"Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString()   
            })
        }else{
            return res.status(400).json({message:"Inavalid Credentials"});
        }

    }catch(error){
        console.log(error);
        res.status(500).json("error detected")
    }
}


// contact form
const contact=async(req, res)=>{
    try{
        const {name, contact, message}=req.body;

        ContactForm.create({name,contact,message});

        res.status(200).json("data saved successfully")
    }catch(error){
        res.status(500).json("error detected:",error)
    }
}

const cycleInfo = async(req, res)=>{
    try {
        const {cycleLength, periodDuration, lastPeriodDate, cycleRegularity} = req.body;
       
        console.log(req.body)
        CycleInfo.create({cycleLength, periodDuration, lastPeriodDate, cycleRegularity});

        res.status(200).json("Data Saved Successfully")
    } catch (error) {
        res.status(500).json("error detected ", error)
    }
}


const selectCheck = async(req, res)=>{
    try {
        let check =await CycleInfo.find({});
        console.log(check,"check")

        res.status(200).json("Data fetched Successfully")

    } catch (error) {
        console.log(error)
        res.status(500).json("error detected ", error)
    }
}








module.exports = { home, registeration, login, contact, cycleInfo, selectCheck }