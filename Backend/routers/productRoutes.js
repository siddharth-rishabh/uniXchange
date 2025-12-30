import express from "express";
import { verifyFirebaseToken } from "../middleware/firebaseAuth.js";
import upload from "../middleware/upload.js";
import {
  listProduct,
  deleteListing,
  getAllProduct,
  productById,
  getMyProducts,
  getProductsByCategory,
} from "../controllers/productController.js";

const router = express.Router();

router.post(
  "/list",
  verifyFirebaseToken,
  upload.array("images", 5),
  listProduct
);

router.get("/all", getAllProduct);
router.get("/category/:category", getProductsByCategory);
router.get("/:id", productById);
router.delete("/:id", verifyFirebaseToken, deleteListing);
router.get("/user/my-products", verifyFirebaseToken, getMyProducts);

export default router;
