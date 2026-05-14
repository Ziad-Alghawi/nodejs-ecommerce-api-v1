import asyncHandler from "express-async-handler";
import slugify from "slugify";
import ApiError from "../utils/apiError.js";

import SubCategory from "../models/subCategoryModel.js";

export const setCategoryIdToBody = (req, res, next) => {
  //Nested route
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
// @desc Create a new subcategory
// @route POST /api/v1/subcategories
// @access Private
export const createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});

// Nested route >> Get /api/v1/categories/:categoryId/subcategories
export const createFilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObject = filterObject;
  next();
};

// @desc Get list of subcategories
// @route GET /api/v1/subcategories
// @access Public
export const getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit; //(2-1)*5=5

  const subCategories = await SubCategory.find(req.filterObject)
    .skip(skip)
    .limit(limit);
  //if not nessary to populate category dont, because it will use 2 queries///////
  /* .populate({
     path: "category",
     select: "name -_id",
   });
  */

  res.status(200).json({
    results: subCategories.length,
    page,
    data: subCategories,
  });
});

//@desc get a specific subcategory by id
// @route GET /api/v1/subcategories/:id
// @access Public
export const getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id);
  //if not nessary to populate category dont, because it will use 2 queries///////
  /* .populate({
     path: "category",
     select: "name -_id",
   });
  */
  if (!subCategory) {
    return next(new ApiError(`No SubCategory for this id ${id} `, 404));
  }
  res.status(200).json({ data: subCategory });
});

//@desc  update a specific subcategory by id
// @route PUT /api/v1/subcategories/:id
// @access Private
export const updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subCategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    {
      name,
      slug: slugify(name),
      category,
    },
    { new: true },
  );

  if (!subCategory) {
    return next(new ApiError(`No SubCategory for this id ${id} `, 404));
  }
  res.status(200).json({ data: subCategory });
});

//@desc  Delete a specific subcategory by id
// @route DELETE /api/v1/subcategories/:id
// @access Private
export const deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subCategory = await SubCategory.findByIdAndDelete(id);

  if (!subCategory) {
    return next(new ApiError(`No SubCategory for this id ${id} `, 404));
  }
  res.status(204).send();
});
