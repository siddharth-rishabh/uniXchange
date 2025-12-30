import Product from "../models/Product.js";

const listProduct = async (req, res) => {
  try {
    const { name, description, price, category, condition } = req.body;

    if (!name || !price || !category || !condition) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const images = req.files ? req.files.map((file) => file.path) : [];

    const product = new Product({
      name,
      description,
      price,
      category: category.toLowerCase(),
      condition,
      images,
      seller: req.user._id,
      status: "available",
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product listed successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteListing = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Listing deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getAllProduct = async (req, res) => {
  try {
    const { search } = req.query;

    let query = { status: "available" };

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(query).populate("seller", "name hostel college").sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

const productById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id)
      .populate("seller", "name profileImage contact college hostel")
      .select("name description price images category condition status seller createdAt");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({
      seller: req.user._id,
    })
      .populate("seller", "name hostel college")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch your products",
    });
  }
};


const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { search } = req.query;

    let query = {
      status: "available",
      category: category.toLowerCase(),
    };

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(query)
      .populate("seller", "name hostel college")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch category products",
    });
  }
};


export {
  listProduct,
  deleteListing,
  getAllProduct,
  productById,
  getMyProducts,
  getProductsByCategory,
};
