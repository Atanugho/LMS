import { Router } from "express";
import { 
    changePassword, 
    forgotPassword, 
    getLoggedInUserDetails,
    loginUser,
    logoutUser,
    registerUser, 
    resetPassword, 
    updateUser 
} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.midddleware.js";

const router = Router();

router.post('/register',upload.single("avatar"),registerUser);
router.post('/login',loginUser);
router.get('/logout',logoutUser);
router.get('/me',isLoggedIn,getLoggedInUserDetails);
router.post('/forgot-password',forgotPassword);
router.post('/reset/:resetToken',resetPassword);
router.post('/change-password',isLoggedIn,changePassword);
router.put('/update',isLoggedIn,upload.single("avatar"),updateUser)

export default router;