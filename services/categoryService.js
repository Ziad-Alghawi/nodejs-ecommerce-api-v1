import CategoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";

// @desc Get list of categories
// @route GET /api/v1/categories
// @access Public
export const getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit; //(2-1)*5=5
  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({
    results: categories.length,
    page,
    data: categories,
  });
});

// @desc Create a new category
// @route POST /api/v1/categories
// @access Private
export const createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});
