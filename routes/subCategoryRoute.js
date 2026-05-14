import express from "express";

import { createSubCategory } from "../services/subCategoryService.js";
import { createsubCategoryValidator } from "../utils/validators/subCategoryValidator.js";

const router = express.Router();

router.route("/").post(createsubCategoryValidator, createSubCategory);

export default router;
