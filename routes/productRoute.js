import express from "express";
import {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} from "../utils/validators/productValidator.js";

import {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService.js";

const router = express.Router();

// @desc Get list of products
// @route GET /api/v1/products
// @access Public

// @desc Create a new product
router.route("/").get(getProducts).post(createProductValidator, createProduct);

// @desc Get a specific product by id
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

export default router;
