const express = require("express");
const router = express.Router();
const cloudinary = require("../utils.js/cloudinary");
const upload = require("../middleware/multer");

router.post("/upload", upload.single("image"), function (req, res) {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded",
        });
    }
    
    cloudinary.uploader.upload(req.file.path, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Error uploading to Cloudinary",
            });
        }
        console.log("file uploaded successfully to cloudinary" , result)
        res.status(200).json({
            success: true,
            message: "Uploaded!",
            data: result,
        });
    });
});

module.exports = router;
