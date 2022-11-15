import express from 'express';
import {userSignup,Login,updateUser} from '../controller/user.js';
import {checkEmail} from '../middleware/checkEmail'
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();



 router.post('/userSignup',checkEmail,userSignup);
 router.post('/Login',Login);
 router.post("/updateUser", updateUser);
 


export default router;