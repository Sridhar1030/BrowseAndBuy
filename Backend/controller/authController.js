// controllers/authController.js
import { User } from "../models/User.js";
import { ApiError } from "../utils.js/ApiErrorHandler.js";
import { asyncHandler } from "../utils.js/asyncHandler.js";
import { ApiResponse } from "../utils.js/ApiResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils.js/sendmail.js";
import validator from "email-validator";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "some thing went wrong while create a token");
    }
};

const signup = asyncHandler(async (req, res) => {
    const { username, email, password, fullName } = req.body;

    if (
        [fullName, email, password, username].some(
            (field) => field?.trim() === ""
        )
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const isValid = validator.validate(email);

    if (!isValid) {
        return res.status(400).json({ message: "Email is not valid" });
    }

    const userExists = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({ username, email, password, fullName });

    const user = await User.findById(newUser._id).select(
        "-password -refreshToken"
    );

    if (!user) {
        return res.status(400).json({
            message: "some thing went wrong while regsitering the user",
        });
    }

    return res.status(200).json(
        new ApiResponse(201, "User successfully created", {
            user,
            chat: req.chat || "empty",
        })
    );
});

const login = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if (!((email || username) && password)) {
        throw new ApiError(400, "All field is required");
    }

    const user = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const checkPassword = await user.isPasswordCorrect(password);

    if (!checkPassword) {
        throw new ApiError(401, "Password is wrong");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
    );

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(201, "User logged In Successfully", {
                user: loggedInUser,
                accessToken,
                refreshToken,
            })
        );
});

const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(201, "User is logout successfully", {}));
});

const userData = asyncHandler(async (req, res) => {
    return res.status(201).json(
        new ApiResponse(201, "chat detail is fetch", {
            user: req.user,
        })
    );
});

const getUserData = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(new ApiResponse(200, "User data", user));
});

const getAllUsers = asyncHandler(async (req, res) => {
    console.log("Request received to fetch all users");

    try {
        // Fetch all users excluding sensitive and unnecessary fields
        const users = await User.find({})
            .select("-password -resetPasswordRequests -refreshToken -ProductId -BoughtProductId -__v -isAdmin");

        if (!users || users.length === 0) {
            console.error("No users found in the database");
            throw new ApiError(404, "Users not found");
        }

        console.log(`Successfully fetched ${users.length} user(s)`);
        return res.status(200).json(new ApiResponse(200, "All users", users));
    } catch (error) {
        console.error("Error fetching users:", error.message);
        throw error; // Let the global error handler manage this
    }
});

const searchUsers = async (req, res) => {
    try {
        const { query } = req.query;
        const currentUserId = req.user._id; 

        if (!query) {
            return res.status(200).json({ 
                success: true, 
                data: [] 
            });
        }

        // Using index for username field for better performance
        const users = await User.find({
            $and: [
                { 
                    username: { 
                        $regex: query, 
                        $options: 'i' 
                    } 
                },
                { 
                    _id: { 
                        $ne: currentUserId 
                    } 
                }
            ]
        })
        .select('username email _id')
        .limit(10); // Limiting results for better performance

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error searching users',
            error: error.message
        });
    }
};



const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        throw new ApiError(400, "Password must be same");
    }

    const user = await User.findById(req.user?._id);

    const passwordCheck = await user.isPasswordCorrect(oldPassword);

    if (!passwordCheck) {
        throw new ApiError(400, "Password is wrong");
    }

    user.password = newPassword;

    user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, "Password is updated", {}));
});

const updateUserDetail = asyncHandler(async (req, res) => {
    const { username, fullName } = req.body;

    if (!username || !fullName) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                username,
                fullName,
            },
        },
        {
            new: true,
        }
    ).select("-password");

    console.log(user);

    if (!user) {
        throw new ApiError(400, "User not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "User detail is updated", { user }));
});

const forgotPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return next(new ApiError(404, "We could not find the email"));
    }

    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    if (
        user.resetPasswordRequests.lastRequest &&
        user.resetPasswordRequests.lastRequest > oneDayAgo
    ) {
        if (user.resetPasswordRequests.count >= 5) {
            return next(
                new ApiError(
                    429,
                    "You have exceeded the maximum number of reset requests for today. Please try again tomorrow."
                )
            );
        }
    } else {
        user.resetPasswordRequests.count = 0;
    }

    user.resetPasswordRequests.count += 1;
    user.resetPasswordRequests.lastRequest = now;
    await user.save();

    const secret = process.env.ACCESS_TOKEN_SECRET + user.password;
    const token = jwt.sign({ email, _id: user._id }, secret, {
        expiresIn: "5m",
    });
    const link = `https://browse-and-buy.vercel.app/reset-password/${user._id}/${token}`;

    sendEmail(link, email)
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });

    return res.json(
        new ApiResponse(200, "Link has been sent to your email", {})
    );
});

const resetPassword = asyncHandler(async (req, res, next) => {
    const { id, token } = req.params;
    const { newPassword, confirmPassword } = req.body;

    try {
        const user = await User.findOne({ _id: id });

        if (!user) {
            const error = new ApiError(404, "User not found");
            return next(error);
        }

        const secret = process.env.ACCESS_TOKEN_SECRET + user.password;

        let verified;
        try {
            verified = jwt.verify(token, secret);
        } catch (err) {
            throw new ApiError(401, "Token is invalid");
        }

        if (newPassword !== confirmPassword) {
            throw new ApiError(400, "Passwords do not match");
        }

        const encryptedPassword = await bcrypt.hash(confirmPassword, 10);

        await User.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    password: encryptedPassword,
                },
            },
            { new: true }
        );

        return res.json(
            new ApiResponse(200, "Password updated successfully", {})
        );
    } catch (error) {
        console.error("Error resetting password:", error);
        return next(new ApiError(500, "Internal Server Error"));
    }
});

const deleteAccount = asyncHandler(async (req, res) => {
    const deleteUser = await User.findByIdAndDelete(req.user?._id);

    if (!deleteUser) {
        throw new ApiError(404, "User not found");
    }

    return res.json(new ApiResponse(200, "User is deleted", {}));
});

export {
    generateAccessAndRefreshToken,
    login,
    signup,
    logout,
    userData,
    changePassword,
    updateUserDetail,
    forgotPassword,
    resetPassword,
    deleteAccount,
    getUserData,
    getAllUsers,
    searchUsers
};
