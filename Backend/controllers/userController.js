import User from '../models/User.js';

export const registerUser = async(req,res)=>{
    try{
        const {
            firebaseUid, name, email, profileImage, contact, college, hostel
        }= req.body;
        const user= await User.findOne({firebaseUid});

        if(user){
            return res.status(400).json({success:false, message:"User already exists"});
        }
        const newUser = new User({
            firebaseUid, name, email, profileImage, contact, college, hostel
        });
         await newUser.save();

         return res.status(201).json({success:true, message:"User Created"});
    }catch(error){
        return res.status(500).json({success:false, message:"error creating user " +error.message})
    }
};

export const getUser = async (req ,res)=>{
    try{
        return res.status(200).json({success:true, data:req.user});

    }catch(error){
        return res.status(500).json({success:false, message:"something went wrong" + error.message});
    }
};

// module.exports = {registerUser, getUser};
