import User from "../models/userModel.js";
import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary";
import sendEmail from "../utils/sendemail.js";
import crypto from 'crypto';

const cookieOption = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
};

const register = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return next(new AppError("All fields are required", 400));
  }

  const userExists = await user.findOne({ email });

  if (userExists) {
    return next(new AppError("Email Already Exists", 400));
  }

  const user = await UserActivation.create({
    fullName,
    email,
    password,
    avatar: {
      public_id: email,
    },
  });

  if (!user) {
    return next(new AppError("User Registration Failed,Please Try Again", 400));
  }

  //file uploaded

  if (req.file) {
    console.log(req.file);
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms project",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",
      });
      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (e) {
      return next(
        new AppError(error || "File is not uploaded ,please try again", 500)
      );
    }
  }

  await user.save();

  user.password = undefined;

  const token = await User.generateJWTToken();

  res.cookie("token", cookieOption);

  res.status(201).json({
    success: true,
    message: "User Registration Succesfully",
    user,
  });
};

const login = async (req, res,next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("All fields are required", 400));
    }

    const user = await user.email
      .findOne({
        email,
      })
      .select("+password");

    if (!user || !user.comparePassword(password)) {
      return next(new AppError("Email and Password does not match", 400));
    }

    const token = await user.generateJWTToken();
    user.password = undefined;

    res.cookie("token", token, cookieOption);

    res.status(200).json({
      success: true,
      message: "user login succesfully",
      user,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

const logout = (req, res) => {
  res.cookie("token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "User Logout Succesfully",
  });
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById();

    res.status(200).json({
      success: true,
      message: "User details ",
      user,
    });
  } catch (e) {
    return next(new AppError("Failed to fetch Profile details", 500));
  }
};

const forgotPassword = async(req,res,next) => {
    const {email} = req.body;

    if(!email){
      return next(new AppError("Email is required", 400));
    }

    const user = await User.findOne({email});
    if(!user){
      return next(new AppError("Email is not registered", 400));
    }

    const resetToken = await user.generatePasswordResetToken();

    await user.save();

    const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const message = `${resetPasswordURL}`

    try{
      await sendEmail(email,subject,message);

        res.status(200).json({
          success:true,
          message:`Reset password token has been sent to {email} successfully`
        })
    }   
    catch(e){

      user.forgetPasswordExpiry = undefined;
      user.forgetpasswordToken = undefined;

      await user.save();
      return next(new AppError(e.message, 400));
    }
}

const resetPassword = async(req,res) => {
    const {resetToken} = req.params;

    const {password} = req.body;

    const forgetpasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

    const user = await user.findOne({
      forgetpasswordToken,
      forgetPasswordExpiry:{$gt: Date.now()}
    });
    
    if(!user){
      return next(
        new AppError('Token is expired ,please try again',400)
      )
    }

    user.password = password;
    user.forgetpasswordToken = undefined;
    user.forgetPasswordExpiry = undefined;

    user.save();

    res.status(200).json({
      success:true,
      message:'Password changed successfully'
    })
}

const changePassword = async(req,res) => {
    const {oldPassword,newPassword} = req.body;
    const{id} = req.user;

    if(!oldPassword || newPassword){
      return next(
        new AppError('All fields are mandatory',400)
      )
    }

    const user = await User.findOne(id).select('+password');

    if(!user){
      return next(
        new AppError('User does not match',400)
      )
    }

    const isPasswordvalid = await user.comparePassword(oldPassword);

    if(!isPasswordvalid){
      return next(
        new AppError('Invalid old password',400)
      )
    }

    user.password = newPassword;

    await user.save();

    user.passWord = undefined

    res.status(200).json({
      success:true,
      message:'Password changed successfully!'
    });
}

const updateUser = async(req,res) => {
  const {fullName} = req.body;
  const{id} = req.user.id;

  const user = await User.findById(id);
  if(!user){
    return next(
      new AppError('User does not exists',400)
    )
  }

  if(req.fullName){
    user.fullName = fullName;
  }

  if(req.file){
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms project",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",
      });
      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (e) {
      return next(
        new AppError(error || "File is not uploaded ,please try again", 500)
      );
    }
  }
  
  await user.save();
  res.status(200).json({
    success:true,
    message:'Profile update successfully'
  });

}

export { register, login, logout, getProfile,forgotPassword,resetPassword,changePassword,updateUser};
