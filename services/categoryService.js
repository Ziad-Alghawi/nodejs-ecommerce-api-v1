import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import asyncHandler from "express-async-handler";

import * as factory from "./handlersFactory.js";
import { uploadSingleImage } from "../middlewares/uploadImageMiddleware.js";
import Category from "../models/categoryModel.js";

// uplosad single image
export const uploadCategoryImage = uploadSingleImage("image");

// image processing
export const resizeImage = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/categories/${filename}`);

    // save image into our db
    req.body.image = filename;
  }
  next();
});

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
