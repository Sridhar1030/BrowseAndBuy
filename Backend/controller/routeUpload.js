import { Router } from "express";
import cloudinary from "../utils.js/cloudinary.js";
import upload from "../middleware/multer.js";

const router = Router();

router.post("/upload", upload.array("image", 3), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No files uploaded",
            });
        }

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
