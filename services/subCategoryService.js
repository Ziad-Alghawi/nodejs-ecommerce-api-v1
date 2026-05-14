import asyncHandler from "express-async-handler";
import slugify from "slugify";
//import ApiError from "../utils/apiError";

import SubCategory from "../models/subCategoryModel.js";

// @desc Create a new subcategory
// @route POST /api/v1/subcategories
// @access Private
export const createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subcategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subcategory });
});
