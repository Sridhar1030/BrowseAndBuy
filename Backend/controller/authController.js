// controllers/authController.js
import { User } from "../models/User.js";
import { ApiError } from "../utils.js/ApiErrorHandler.js";
import { asyncHandler } from "../utils.js/asyncHandler.js";
import { ApiResponse } from "../utils.js/ApiResponse.js";

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

    const userExists = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({ username, email, password });

    const user = await User.findById(newUser._id).select(
        "-password -refreshToken"
    );

    if (!user) {
        return res.status(400).json({ message: "some thing went wrong while regsitering the user" });
    }

    return res
        .status(200)
        .json(new ApiResponse(201, "User successfully created", user));
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
        req.user._id,
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

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword, confirmPassword  } = req.body;

    if (newPassword !== confirmPassword ) {
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

export { generateAccessAndRefreshToken, login, signup, logout, changePassword };
