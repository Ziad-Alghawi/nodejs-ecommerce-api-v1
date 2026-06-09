import asyncHandler from "express-async-handler";
import slugify from "slugify";
import ApiError from "../utils/apiError.js";

import Product from "../models/productModel.js";

// @desc Get list of products
// @route GET /api/v1/products
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
  // 1) filtering
  const queryStringObj = { ...req.query };
  const excludesFields = ["page", "sort", "limit", "fields"];
  excludesFields.forEach((field) => delete queryStringObj[field]);

  // Apply filtering for gte, gt, lte, lt
  let queryStr = JSON.stringify(queryStringObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  // 2) pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 50;
  const skip = (page - 1) * limit; //(2-1)*5=5

  // Build the query
  const mongooseQuery = Product.find(JSON.parse(queryStr))
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });

  // execute the query
  const products = await mongooseQuery;

  res.status(200).json({
    results: products.length,
    page,
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
