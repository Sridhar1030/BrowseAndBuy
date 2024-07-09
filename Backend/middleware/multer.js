import multer, { diskStorage } from "multer";

const storage = diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });
export default upload;