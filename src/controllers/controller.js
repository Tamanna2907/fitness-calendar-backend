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
            return res.status(400).json({message:"email already exists"});
        }

        const userCreated= await User.create({username, email, phone, password});

        res.status(200).json({message:userCreated,
        token: await userCreated.generateToken(),
        userId:userCreated._id.toString(),
        })

    }catch(error){
        const status=422;
        const message= error.errors[0].message;
        const err= {
            status,message
        }
        next(err)
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
                userId: userExist._id.toString(),
                userName: userExist.username,
                email: userExist.email
            })
        }else{
            return res.status(400).json({message:"Inavalid Credentials"});
        }

    }catch(error){
        const status=422;
        const message= error.errors[0].message;
        const err= {
            status,message
        }
        next(err)
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
        const {cycleLength, periodDuration, lastPeriodDate, cycleRegularity, userId} = req.body;
       
        CycleInfo.create({cycleLength, periodDuration, lastPeriodDate, cycleRegularity, userId});

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


const user = async (req, res) =>{
    try {
        const userData = req.user;

       return res.status(200).json({userData})
    } catch (error) {
        console.log('error from the user route' + error)
    }
}





module.exports = { home, registeration, login, contact, cycleInfo, selectCheck, user }