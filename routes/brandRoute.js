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
  uploadBrandImage,
  resizeImage,
} from "../services/brandService.js";

const router = express.Router();

// http://localhost:8000/api/v1/brands
router.route("/").get(getBrands).post(uploadBrandImage,
  resizeImage, createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(uploadBrandImage,
  resizeImage, updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

export default router;
