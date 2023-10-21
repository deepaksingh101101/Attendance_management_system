const {hashPassword, comparePassword}=require('../helpers/auth')
const User =require('../models/user')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');



const registerUser=async (req,res)=>{
try {
    const {Name, primaryIp, secondaryIp, email, password}=req.body;
    if(!Name){
        return res.json({
            error:"Name is required"
        })
    }
    if(!primaryIp){
        return res.json({
            error:"Please Select Your Primary Machine"
        })
    }
    if(!email){
        return res.json({
            error:"Email is required"
        })
    }

    if(!password || password.length<6){
        return res.json({
            error:"password must be 6 character long"
        })
    }
    // check email
    const exist=await User.findOne({email});
    if(exist){
        return res.json({
            error:"Email is already Taken"
        })
    }

    // Hashing password

    const hashedPassword=await hashPassword(password)

    const user=await User.create({
        Name,primaryIp,secondaryIp,email,password:hashedPassword
    })

    return res.json(user)

} catch (error) {
    console.log(error)
}
}

const loginUser=async(req,res)=>{
try {
    const {email,password}=req.body;
    // check user exist
    const user=await User.findOne({email});
    if(!user){
        return res.json({
            error:"No user Find"
        })
    }

    // checking password
    const match=await comparePassword(password,user.password)

    if(match){
        jwt.sign({email:user.email, id:user._id,name:user.Name},process.env.JWT_SECRET,{},(err,token)=>{
            if(err){
                throw err;
            }
            res.cookie('token',token).json(user)
            console.log(token)
        })
    }
    if(!match){
        res.json({
            error:"Password do not match"
        });
    }
} catch (error) {
    console.log(error)
}
}

const getProfile=(req,res)=>{
const {token}=req.cookies;
if(token){
jwt.verify(token,process.env.JWT_SECRET,{},(err,user)=>{
    if(err){
        throw err;
    }
    res.json(user);
})
}
else{
    res.json(null)
}
}


module.exports={
    registerUser,
    loginUser,
    getProfile,
}