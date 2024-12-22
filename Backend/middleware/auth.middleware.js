import { ApiError } from "../utils.js/ApiErrorHandler.js";
import { asyncHandler } from "../utils.js/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const verifyJwt = asyncHandler(async (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decodedToken)

        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        );

        if (!user) {
            throw new ApiError(401, "Invalid Access token");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, "Invalid access Token");
    }
});

export default verifyJwt;
