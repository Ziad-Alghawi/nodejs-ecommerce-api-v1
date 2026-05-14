import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";

// export const getsusubCategoryValidator = [
//   //Rule number 1 to check if the id is a valid MongoDB ObjectId
//   check("id").isMongoId().withMessage("Invalid susubCategory ID format"),
//   validatorMiddleware,
// ];

export const createsubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("subCategory required")
    .isLength({ min: 2 })
    .withMessage("Too short subCategory name")
    .isLength({ max: 32 })
    .withMessage("Too long subCategory name"),
  check("category")
    .notEmpty()
    .withMessage("subCategory must belong to a category")
    .isMongoId()
    .withMessage("Invalid category ID format"),
  validatorMiddleware,
];

// export const updatesubCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid subCategory ID format"),
//   validatorMiddleware,
// ];

// export const deletesubCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid subCategory ID format"),
//   validatorMiddleware,
// ];
