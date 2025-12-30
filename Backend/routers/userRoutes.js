import express from 'express';
const router = express.Router();

import { registerUser, getUser } from '../controllers/userController.js';
import { verifyFirebaseToken } from "../middleware/firebaseAuth.js";


router.post('/signup', registerUser);
router.get('/me', verifyFirebaseToken, getUser);

export default router;
