import { v2 as cloudinary } from "cloudinary";

console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);
console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
    cloud_name: "sridhar1",
    api_key: "965318861936582",
    api_secret: "0hkwaFrZeF5RzrdNOR5osOzygfI",
});

export default cloudinary;


