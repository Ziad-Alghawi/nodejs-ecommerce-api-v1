import * as factory from "./handlersFactory.js";

import SubCategory from "../models/subCategoryModel.js";

// for the nested route while >>Create
export const setCategoryIdToBody = (req, res, next) => {
  //Nested route
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// for the nested route while >>Get
// Nested route >> Get /api/v1/categories/:categoryId/subcategories
export const createFilterObject = (req, res, next) => {
  let filterObj = {};
  if (req.params.categoryId) filterObj = { category: req.params.categoryId };
  req.filterObj = filterObj;
  next();
};

// @desc Get list of subcategories
// @route GET /api/v1/subcategories
// @access Public
export const getSubCategories = factory.getAll(SubCategory);

//@desc get a specific subcategory by id
// @route GET /api/v1/subcategories/:id
// @access Public
export const getSubCategory = factory.getOne(SubCategory);

// @desc Create a new subcategory
// @route POST /api/v1/subcategories
// @access Private
export const createSubCategory = factory.createOne(SubCategory);

//@desc  update a specific subcategory by id
// @route PUT /api/v1/subcategories/:id
// @access Private
export const updateSubCategory = factory.updateOne(SubCategory);

//@desc  Delete a specific subcategory by id
// @route DELETE /api/v1/subcategories/:id
// @access Private
export const deleteSubCategory = factory.deleteOne(SubCategory);
