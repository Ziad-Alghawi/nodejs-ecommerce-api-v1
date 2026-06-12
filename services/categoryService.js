import * as factory from "./handlersFactory.js";
import Category from "../models/categoryModel.js";

// @desc Get list of categories
// @route GET /api/v1/categories
// @access Public
export const getCategories = factory.getAll(Category);

//@desc get a specific category by id
// @route GET /api/v1/categories/:id
// @access Public
export const getCategory = factory.getOne(Category);

// @desc Create a new category
// @route POST /api/v1/categories
// @access Private
export const createCategory = factory.createOne(Category);

//@desc  update a specific category by id
// @route PUT /api/v1/categories/:id
// @access Private
export const updateCategory = factory.updateOne(Category);

//@desc  Delete a specific category by id
// @route DELETE /api/v1/categories/:id
// @access Private
export const deleteCategory = factory.deleteOne(Category);
