import express from "express";

import {
  createReviewValidator,
  getReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} from "../utils/validators/reviewValidator.js";

import {
  getReviews,
  createReview,
  getReview,
  updateReview,
  deleteReview,
} from "../services/reviewService.js";

import { protect, allowedTo } from "../services/authService.js";

const router = express.Router();

// http://localhost:8000/api/v1/reviews
router
  .route("/")
  .get(getReviews)
  .post(protect, allowedTo("user"), createReviewValidator, createReview);
router
  .route("/:id")
  .get(getReviewValidator, getReview)
  .put(protect, allowedTo("user"), updateReviewValidator, updateReview)
  .delete(
    protect,
    allowedTo("user", "admin", "manager"),
    deleteReviewValidator,
    deleteReview,
  );

export default router;
