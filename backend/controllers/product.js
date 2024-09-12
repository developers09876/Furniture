import { Product } from "../models/product.js";
// import { randomFnForProducts } from "../utils/utils.js";
// import { HTTP_RESPONSE } from "../utils/config.js";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // directory where the files will be stored
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)); // save file with a unique name
//     }
// })

// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
//     fileFilter: fileFilter
// });

export const getAllProducts = async (req, res) => {
  console.log("resss");
  try {
    const allProduct = await Product.find();

    res.status(200).json(allProduct);
  } catch {
    res.status(500).json({ message: error.message });
  }
};
export const getOneProduct = async (req, res) => {
  console.log("req.params.productId", req.params.productId);
  try {
    // Convert the productId to a number
    const productId = parseInt(req.params.productId, 10);

    if (isNaN(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    // Use findOne to search by the productId field
    const product = await Product.findOne({ productId: productId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// import { v2 as cloudinary } from "cloudinary";

// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' }); // or configure as needed

// export const createProduct =  upload.single('image'), async (req, res) => {

//     try {
//     const { name, price, description } = req.body;
//     const image = req.file;

//     // Upload image to Cloudinary
//     const uploadResult = await cloudinary.uploader.upload(image.path, {
//       folder: "products",
//       public_id: `${name.replace(/\s+/g, "_").toLowerCase()}`,
//       use_filename: true,
//       unique_filename: false,
//       overwrite: true,
//     });

//     // Create a new product with the Cloudinary URL
//     const newProduct = new Product({
//       name,
//       price,
//       description,
//       imageUrl: uploadResult.secure_url,
//     });

//     // Save the product in the database
//     const savedProduct = await newProduct.save();

//     res.status(200).json({ message: "Product added successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }
// ;
