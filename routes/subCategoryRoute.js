import express from "express";

import {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../services/subCategoryService.js";
import {
  createsubCategoryValidator,
  getsusubCategoryValidator,
  updatesubCategoryValidator,
  deletesubCategoryValidator,
} from "../utils/validators/subCategoryValidator.js";

const router = express.Router();

// here is the route for subcategories
router
  .route("/")
  .post(createsubCategoryValidator, createSubCategory)
  .get(getSubCategories);

// Validate data before reaching the controller/business logic
router
  .route("/:id")
  .get(getsusubCategoryValidator, getSubCategory)
  .put(updatesubCategoryValidator, updateSubCategory)
  .delete(deletesubCategoryValidator, deleteSubCategory);

export default router;
