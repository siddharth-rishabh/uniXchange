import admin from "../config/firebase.js";
import User from "../models/User.js";

export const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("No authorization header or not Bearer");
      return res.status(401).json({ error: "No token provided" });
    }

    const idToken = authHeader.split(" ")[1];
    console.log("Verifying token:", idToken.substring(0, 50) + "...");
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    // console.log("Decoded token:", { uid: decodedToken.uid, email: decodedToken.email, process.env.FIREBASE_PROJECT_ID: decodedToken.aud });

    const firebaseUid = decodedToken.uid;
    let user = await User.findOne({firebaseUid});
    if(!user){
      
      user = new User({
        firebaseUid,
        email: decodedToken.email,
        name: decodedToken.name || 'Unknown',
        contact: 0, 
        college: '',
        hostel: '',
        profileImage: decodedToken.picture || '',
      });
      await user.save();
      console.log("Created new user:", user._id);
    }
    req.user = user; 
    console.log("User set:", req.user._id);
    next();
  } catch (error) {
    console.error("Firebase token verification failed:", error.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
