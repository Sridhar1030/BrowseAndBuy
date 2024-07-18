import { Router } from "express";
// import cloudinary from "../utils.js/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import upload from "../middleware/multer.js";


const router = Router();

router.post("/upload", upload.array("image", 3), async (req, res) => {
    try {
        console.log("CLOUDINARY_CLOUD_NAME:", "sridhar1");
        console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);
        console.log(
            "CLOUDINARY_API_SECRET:",
            process.env.CLOUDINARY_API_SECRET
        );

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No files uploaded",
            });
        }

        cloudinary.config({
            cloud_name: "sridhar1",
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        const uploadResults = [];
        for (const file of req.files) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: "SHT",
            });
            uploadResults.push(result);
        }

        console.log("Files uploaded successfully to Cloudinary", uploadResults);
        res.status(200).json({
            success: true,
            message: "Uploaded!",
            data: uploadResults,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: err.message,
            message: "Error uploading to Cloudinary",
        });
    }
});


export default router;
