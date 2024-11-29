const jwt = require("jsonwebtoken");
const user = require("../../schema/models/user_model")


const authMiddleware = async(req, res, next) =>{
    const token = req.header("Authorization")

    if(!token){
        return res
        .status(401)
        .json({message:"Unauthorized HTTP"})
    }

    const jwtToken = token?.replace('Bearer',"")?.trim();

    try {
        
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SIGNATURE)
        
        const userData = await user.findOne({email : isVerified.email}).select({password : 0,})

        req.user = userData;
        req.token = token;
        req.userId = userData._id;
        
        next();
    } catch (error) {
        console.log(error)
    }

}


module.exports = authMiddleware