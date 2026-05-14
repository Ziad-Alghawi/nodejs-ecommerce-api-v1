import express from "express";

import {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  createFilterObject,
} from "../services/subCategoryService.js";
import {
  createsubCategoryValidator,
  getsusubCategoryValidator,
  updatesubCategoryValidator,
  deletesubCategoryValidator,
} from "../utils/validators/subCategoryValidator.js";

//mergeParams: allow to access params on oter routers
//ex : we want to access categoryId from categoryRoute to use it in subCategoryRoute
const router = express.Router({ mergeParams: true });

// here is the route for subcategories
router
  .route("/")
  .post(setCategoryIdToBody, createsubCategoryValidator, createSubCategory)
  .get(createFilterObject, getSubCategories);

// Validate data before reaching the controller/business logic
router
  .route("/:id")
  .get(getsusubCategoryValidator, getSubCategory)
  .put(updatesubCategoryValidator, updateSubCategory)
  .delete(deletesubCategoryValidator, deleteSubCategory);

export default router;
