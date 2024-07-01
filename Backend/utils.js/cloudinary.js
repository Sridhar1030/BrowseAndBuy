const cloudinary = require("cloudinary").v2;
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;

// const uploadOnCloudinary = async(localFilePath)=>{
//     try {
//         if (!localFilePath) return null
//         //upload the file on cloudinary
//         const res = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"

//         })
//         //file has been uploaded successfully
//         console.log("file is uploaded on cloduinary",response.url);
//         return response;

//     } catch (error) {
//         fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload operation got failed
//         return null;

//     }
// }

// export {uploadOnCloudinary}
