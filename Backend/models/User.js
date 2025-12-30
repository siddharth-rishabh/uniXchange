import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { 
      type: String, 
      required: true, 
      unique: true 
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    profileImage:{
        type: String,
        default:""
    },
    contact: {
      type: Number,
      max: 9999999999,
      required: true
    },
    college: {
      type: String,
      required: true
    },
    hostel: {
      type: String,
      required: true
    },
    listedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    boughtProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    
  },
  {timestamps:true}
);

const User = mongoose.model("User", userSchema);
export default User;
