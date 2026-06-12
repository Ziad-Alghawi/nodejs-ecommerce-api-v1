import slugify from "slugify";
import { check, body } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";

export const getCategoryValidator = [
  //Rule number 1 to check if the id is a valid MongoDB ObjectId
  check("id").isMongoId().withMessage("Invalid Category ID format"),
  validatorMiddleware,
];

export const createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("category required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

export const updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category ID format"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];

export const deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category ID format"),
  validatorMiddleware,
];
