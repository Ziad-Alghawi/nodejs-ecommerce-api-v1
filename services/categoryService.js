import multer from "multer";
import sharp from 'sharp';
import { v4 as uuidv4 } from "uuid";
import asyncHandler from "express-async-handler";

import ApiError from "../utils/apiError.js";
import * as factory from "./handlersFactory.js";
import Category from "../models/categoryModel.js";

// 1- DiskStorage engine
// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/categories");
//   },
//   filename: function (req, file, cb) {
//     //category-${id}-Date.now().jpeg
//     const ext = file.mimetype.split("/")[1];
//     const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;
//     cb(null, filename);
//   },
// });

// 2- MemoryStorage engine
const multerStorage = multer.memoryStorage();

const multerFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")){
    cb(null, true);
  } else {
      cb(new ApiError("only images are allowed", 400), false);
    }
}

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const uploadCategoryImage = upload.single("image");

export const resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
  .resize(600, 600)
  .toFormat("jpeg")
  .jpeg({quality: 90})
  .toFile(`uploads/categories/${filename}`);

  // save image into our db
  req.body.image = filename;

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
