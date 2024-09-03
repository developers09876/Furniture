import { Product } from "../models/product.js";
// import { randomFnForProducts } from "../utils/utils.js";
// import { HTTP_RESPONSE } from "../utils/config.js";

// const router = express.Router();
// get all products=======================================
// export const getAllProducts = async (req, res) => {
// 	try {
// 		if (Object.keys(req.query).length === 0) {
// 			const products = await Product.find();
// 			const randomProductIndices = randomFnForProducts(products.length);
// 			const randomProducts = randomProductIndices.map(
// 				(index) => products[index - 1]
// 			);
// 			return res.json({ data: randomProducts });
// 		} else {
// 			const colors = req.query.color?.split(",") || [];
// 			const categories = req.query.category?.split(",") || [];
// 			const collections = req.query.collection?.split(",") || [];
// 			const price = req.query.price ? Number(req.query.price) : null;

// 			const query = {};

// 			if (colors.length > 0) {
// 				query.color = { $in: colors };
// 			}

// 			if (categories.length > 0) {
// 				query.category = { $in: categories };
// 			}

// 			if (collections.length > 0) {
// 				query.collection_ = { $in: collections };
// 			}

// 			if (price !== null) {
// 				query.price = { $lt: price };
// 			}

// 			const products = await Product.find(query);
// 			return res.json({ data: products });
// 		}
// 	} catch (error) {
// 		res
// 			.status(HTTP_RESPONSE.INTERNAL_ERROR.CODE)
// 			.json(HTTP_RESPONSE.INTERNAL_ERROR.MESSAGE);
// 	}
// };

// // get search value
// export const getSearchValue = async (req, res) => {
// 	try {
// 		const { searchvalue } = req.params;
// 		const products = await Product.find({
// 			$or: [{ title: searchvalue }, { category: searchvalue }],
// 		});
// 		res.status(HTTP_RESPONSE.OK.CODE).json({ data: products });
// 	} catch (err) {
// 		res
// 			.status(HTTP_RESPONSE.INTERNAL_ERROR.CODE)
// 			.json(HTTP_RESPONSE.INTERNAL_ERROR.MESSAGE);
// 	}
// };

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // directory where the files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // save file with a unique name
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
    fileFilter: fileFilter 
});


export const getAllProducts = async (req,res)=>{
	console.log('resss')
	try{
		const allProduct =await Product.find()
        
        res.status(200).json(allProduct);
	}
	catch{
		res.status(500).json({ message: error.message });
	}
}
export const getOneProduct = async (req, res) => {
	console.log('req.params.productId', req.params.productId);
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
}

// export const createProduct = async (req, res) => {
//     try {
//         const newProduct = new Product(req.body);
//         const savedProduct = await newProduct.save();
//         res.status(200).json(savedProduct);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }
export const createProduct = async (req, res) => {
    try {
        // Save uploaded image paths to an array
        const imagePaths = req.files.map(file => file.path);

        // Create a new product with the image paths
        const newProduct = new Product({
            ...req.body,
            images: imagePaths
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
