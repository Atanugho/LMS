
import { Schema,model } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new Schema({
    fullName:{
        type:'string',
        required:[true,'Name is required'],
        minLength:[5,'Name must be atleast 5 character'],
        maxLength:[50,'Name should be less than 50 character'],
        lowercase:true,
        trim:true
    },
    email:{
        type:'string',
        required:[true,'Email is required'],
        lowercase:true,
        trim:true,
        unique:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,'please fill in a valid email address'],
    },
    passWord:{
        type:'string',
        required:[true,'password is required'],
        minLength:[8,'password must be atleast 8 character'],
        select:false,
    },

    avtar:{
        public_id:{
            type:'string'
        },
        secure_url:{
            type:'string'
        }
    },
    role:{
        type:'string',
        enum:['USER','ADMIN'],
        default:'USER'
    },
    forgetpasswordToken :String,
    forgetPasswordExpiry:Date,
    subscription:{
        id:'string',
        status:'string'
    }
    
},{
    timestamps:true
});

userSchema.pre('save',async function(next){
    if(!this.isModified('passWord')){
        return next();
    }
    this.passWord = await bcrypt.hash(this.passWord,10);
});

userSchema.methods = {
    generateJWTToken : async function(){
        return await jwt.sign(
            {id:this._id,email:this.email,subscription:this.subscription,role:this.role},
            process.env.JWT_SECRET,{
                expiresIn:process.env.JWT_EXPIRY,
            }
        )
    },
    comparePassword:async function(plainTextPassword){
        return await bcrypt.compare(plainTextPassword,this.passWord);
    },
    generatePasswordResetToken: async function () {
        const resetToken = crypto.randomBytes(20).toString('hex');

        this.forgetpasswordToken = crypto
                    .createHash('sha256')
                    .update(resetToken)
                    .digest('hex')
        ;
        this.forgetPasswordExpiry = Date.now() + 15*60*1000;

        return resetToken;
    }
}

const User = model('user',userSchema);


export default User;

