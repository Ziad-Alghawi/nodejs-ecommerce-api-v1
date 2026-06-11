import asyncHandler from "express-async-handler";
import slugify from "slugify";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";

import Category from "../models/categoryModel.js";

// @desc Get list of categories
// @route GET /api/v1/categories
// @access Public
export const getCategories = asyncHandler(async (req, res) => {
  // Build the query
  const documentsCount = await Category.countDocuments();
  const apiFeatures = new ApiFeatures(Category.find(), req.query)
    .paginate(documentsCount)
    .filter()
    .search()
    .limitFields()
    .sort();

  // execute the query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const categories = await mongooseQuery;

  res.status(200).json({
    results: categories.length,
    pagination: paginationResult,
    data: categories,
  });
});

//@desc get a specific category by id
// @route GET /api/v1/categories/:id
// @access Public
export const getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return next(new ApiError(`No Category for this id ${id} `, 404));
  }
  res.status(200).json({ data: category });
});

// @desc Create a new category
// @route POST /api/v1/categories
// @access Private
export const createCategory = asyncHandler(async (req, res) => {
  // using destructuring is cleaner than using req.body.name
  const { name } = req.body;
  const category = await Category.create({
    name,
    slug: slugify(name),
  });
  res.status(201).json({ data: category });
});

//@desc  update a specific category by id
// @route PUT /api/v1/categories/:id
// @access Private
export const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await Category.findOneAndUpdate(
    { _id: id },
    {
      name,
      slug: slugify(name),
    },
    { new: true },
  );

  if (!category) {
    return next(new ApiError(`No Category for this id ${id} `, 404));
  }
  res.status(200).json({ data: category });
});

//@desc  Delete a specific category by id
// @route DELETE /api/v1/categories/:id
// @access Private
export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    return next(new ApiError(`No Category for this id ${id} `, 404));
  }
  res.status(204).send();
});
