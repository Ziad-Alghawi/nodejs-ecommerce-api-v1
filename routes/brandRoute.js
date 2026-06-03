import express from "express";
import {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} from "../utils/validators/brandValidator.js";

import {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
} from "../services/brandService.js";

const router = express.Router();

// http://localhost:8000/api/v1/brands
router.route("/").get(getBrands).post(createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

export default router;
