import express from "express";
import { protect, allowedTo } from "../services/authService.js";
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
  .post(
    protect,
    allowedTo("admin", "manager"),
    setCategoryIdToBody,
    createsubCategoryValidator,
    createSubCategory,
  )
  .get(createFilterObject, getSubCategories);

// Validate data before reaching the controller/business logic
router
  .route("/:id")
  .get(getsusubCategoryValidator, getSubCategory)
  .put(
    protect,
    allowedTo("admin", "manager"),
    updatesubCategoryValidator,
    updateSubCategory,
  )
  .delete(
    protect,
    allowedTo("admin"),
    deletesubCategoryValidator,
    deleteSubCategory,
  );

export default router;
