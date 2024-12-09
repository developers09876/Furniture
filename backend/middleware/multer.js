import multer from "multer";

const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("uploadImage", file);
    cb(null, "../publicss");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// const image = multer({ storage: Storage });
const uploadImage = multer({
  Storage,
  limits: { fileSize: 100000 * 5 },
});
export default uploadImage.single("image");
