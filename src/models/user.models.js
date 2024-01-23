import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index:true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName:{
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar:{
        type: String, // cloud se lenge url
        required: true,
    },
    coverImage:{
        type:String, // cloud se url lenge
    },
    password:{
        type:String,
        required:[true, "Password is required"],
    },
    watchHistory:[{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
    refreshToken:{
        type: String,
    }
}, {timestamps: true})

// pre :- middleware h mongoose me | ye kaam krega kuch hone se pehle
// kuch hona is "save" (or bhi h) :- save hone se pehle ek call back function run krna 
// yaha arrow call back function use nhi krenge kyuki userSchema ka data bhi to use krna h to "this" arrow callback me nhi de skte
// isiliye function () aise callback function hoga 
userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    return next();
});


// custom method .methods :- add this custom method to userSchema 
// .isPasswordCorrect :- new method ka name
userSchema.methods.isPasswordCorrect = async function(password){
    // password correct or not
    // returns true or false
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', userSchema)