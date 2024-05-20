import { Router } from "express";
import { changePassword, forgotPassword, getProfile,login,logout,register, resetPassword, updateUser } from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.midddleware.js";

const router = Router();

router.post('/register',upload.single("avatar"),register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',isLoggedIn,getProfile);
router.post('/forgot-password',forgotPassword);
router.post('/resetToken',resetPassword);
router.post('/change-password',isLoggedIn,changePassword);
router.put('/update',isLoggedIn,upload.single("avatar"),updateUser)

export default router;