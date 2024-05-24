
import { mongoose,Schema } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new Schema({
    fullName:{
        type:String,
        required:[true,'Name is required'],
        minLength:[5,'Name must be atleast 5 character'],
        maxLength:[50,'Name should be less than 50 character'],
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        lowercase:true,
        trim:true,
        unique:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,'please fill in a valid email address'],
    },
    password:{
        type:String,
        required:[true,'password is required'],
        minLength:[8,'password must be atleast 8 character'],
        select:false,
    },

    subscription: {
        id: String,
        status: String,
    },

    avatar: {
        public_id: {
          type: String,
        },
        secure_url: {
          type: String,
        },
    },

    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER'
    },
    forgetpasswordToken :String,
    forgetPasswordExpiry:Date,
    
},{
    timestamps:true
});

// Hashes password before saving to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
  
  comparePassword: async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
  },

  generateJWTToken: async function () {
    return await jwt.sign(
      { id: this._id, role: this.role, subscription: this.subscription },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
  },

  // This will generate a token for password reset
  
  generatePasswordResetToken: async function () {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.forgotPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;

    return resetToken;
  },
};

const User = mongoose.model("User", userSchema);

export default User;

