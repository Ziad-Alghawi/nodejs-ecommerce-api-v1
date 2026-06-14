import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import * as factory from "./handlersFactory.js";
import Category from "../models/categoryModel.js";

// 1- DiskStorage engine
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/categories");
  },
  filename: function (req, file, cb) {
    //category-${id}-Date.now().jpeg
    const ext = file.mimetype.split("/")[1];
    const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: multerStorage });

export const uploadCategoryImage = upload.single("image");

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
