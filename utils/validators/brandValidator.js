import slugify from "slugify";
import { check, body } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";

export const getBrandValidator = [
  //Rule number 1 to check if the id is a valid MongoDB ObjectId
  check("id").isMongoId().withMessage("Invalid Brand ID format"),
  validatorMiddleware,
];

export const createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand name required")
    .isLength({ min: 3 })
    .withMessage("Too short brand name")
    .isLength({ max: 32 })
    .withMessage("Too long brand name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

export const updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand ID format"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];

export const deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand ID format"),
  validatorMiddleware,
];
