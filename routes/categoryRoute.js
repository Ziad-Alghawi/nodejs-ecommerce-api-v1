import express from "express";
import { getCategories, createCategory } from "../services/categoryService.js";

const router = express.Router();

// http://localhost:8000/api/v1/categories
router.route("/").get(getCategories).post(createCategory);

export default router;
