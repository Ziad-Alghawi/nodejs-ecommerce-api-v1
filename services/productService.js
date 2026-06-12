import * as factory from "./handlersFactory.js";
import Product from "../models/productModel.js";

// @desc Get list of products
// @route GET /api/v1/products
// @access Public
export const getProducts = factory.getAll(Product, "Product");

//@desc get a specific product by id
// @route GET /api/v1/products/:id
// @access Public
export const getProduct = factory.getOne(Product);

// @desc Create a new product
// @route POST /api/v1/products
// @access Private
export const createProduct = factory.createOne(Product);

//@desc  update a specific product by id
// @route PUT /api/v1/products/:id
// @access Private
export const updateProduct = factory.updateOne(Product);

//@desc  Delete a specific product by id
// @route DELETE /api/v1/products/:id
// @access Private
export const deleteProduct = factory.deleteOne(Product);
