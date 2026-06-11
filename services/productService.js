import asyncHandler from "express-async-handler";
import slugify from "slugify";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";

import Product from "../models/productModel.js";

// @desc Get list of products
// @route GET /api/v1/products
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
  // Build the query
  const documentsCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .paginate(documentsCount)
    .filter()
    .search()
    .limitFields()
    .sort();

  // execute the query
  const { mongooseQuery, paginationResult } = apiFeatures;

  const products = await mongooseQuery;

  res.status(200).json({
    results: products.length,
    pagination: paginationResult,
    data: products,
  });
});

//@desc get a specific product by id
// @route GET /api/v1/products/:id
// @access Public
export const getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate({
    path: "category",
    select: "name -_id",
  });
  if (!product) {
    return next(new ApiError(`No Product for this id ${id} `, 404));
  }
  res.status(200).json({ data: product });
});

// @desc Create a new product
// @route POST /api/v1/products
// @access Private
export const createProduct = asyncHandler(async (req, res) => {
  // using destructuring is cleaner than using req.body.name
  req.body.slug = slugify(req.body.title);

  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});

//@desc  update a specific product by id
// @route PUT /api/v1/products/:id
// @access Private
export const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // if the user update the title we need to update the slug too
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError(`No Product for this id ${id} `, 404));
  }
  res.status(200).json({ data: product });
});

//@desc  Delete a specific product by id
// @route DELETE /api/v1/products/:id
// @access Private
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return next(new ApiError(`No Product for this id ${id} `, 404));
  }
  res.status(204).send();
});
