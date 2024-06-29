const express = require("express");
const router = express.Router();
const cloudinary = require("../utils.js/cloudinary");
const upload = require("../middleware/multer");

router.post("/upload", upload.array("image", 3), async function (req, res) {
	if (!req.files || req.files.length === 0) {
		return res.status(400).json({
			success: false,
			message: "No files uploaded",
		});
	}

	try {
		const uploadResults = [];
		for (const file of req.files) {
			const result = await cloudinary.uploader.upload(file.path);
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
			message: "Error uploading to Cloudinary",
		});
	}
});
router.get("/images", async function (req, res) {
	try {
		// Fetch images metadata from Cloudinary (only URLs)
		const { resources } = await cloudinary.search
			.expression("folder:Home") // Adjust folder path as needed
			.execute();

		const imageUrls = resources.map((file) => file.name);

		console.log("Fetched image URLs from Cloudinary:", imageUrls); // Added console log

		res.status(200).json(imageUrls);
	} catch (error) {
		console.error("Error fetching images from Cloudinary", error);
		res.status(500).json({
			success: false,
			message: "Error fetching images from Cloudinary",
		});
	}
});

module.exports = router;
