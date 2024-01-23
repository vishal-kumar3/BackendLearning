import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const verifyJWT = asyncHandler(async (req, res, next) => {

    try {
        // replace("Bearer ", "") iska mtlb ki Authorization header ke value me bearer ko empty string kr do
        // Authorization : Bearer <token>
        // after replce token mil jayega ya token hi bachega uss string me
        const token = req.cookies?.accessToken || req.header("Authorizaton")?.replace("Bearer ", "")

        console.log("\n\nreq:- ", req)
        console.log("\n\ncookie:- ", req.cookie)

    
        if(!token){
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        )
    
        if(!user){
            throw new ApiError(401, "Invalid Access Token")
        }
    
        // new object add kr diya req me that is user so that req se pta chal skte logged in user kon h
        req.user = user;
        next()
        
    } catch (error) {
        throw new ApiError(401, error?.message ||"Invalid access token")
    }

})
