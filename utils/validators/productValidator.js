import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";

export const createProductValidator = [
  check("title")
    .isLength({ min: 3 })
    .withMessage("Product title must be at least 3 characters long")
    .notEmpty()
    .withMessage("Product title is required"),

  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 2000 })
    .withMessage("Product description must be less than 2000 characters"),

  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product sold must be a number"),

  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({ max: 32 })
    .withMessage("Product price must be less than 32 characters"),

  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product price after discount must be a number")
    .isFloat()

    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error(
          "Product price after discount must be less than product price",
        );
      }
      return true;
    }),

  check("colors")
    .optional()
    .isArray()
    .withMessage("Product colors must be an array of strings"),

  check("imageCover").notEmpty().withMessage("Product image cover is required"),

  check("images")
    .optional()
    .isArray()
    .withMessage("Product images must be an array of strings"),

  check("category")
    .notEmpty()
    .withMessage("Product must belong to a category")
    .isMongoId()
    .withMessage("Invalid category ID"),

  check("subCategory")
    .optional()
    .isMongoId()
    .withMessage("Invalid subcategory ID"),

  check("brand").optional().isMongoId().withMessage("Invalid brand ID"),

  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("Product ratings average must be a number")
    .isLength({ min: 1, max: 5 })
    .withMessage("Product ratings average must be between 1 and 5"),

  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("Product ratings quantity must be a number"),

  validatorMiddleware,
];

export const getProductValidator = [
  check("id").isMongoId().withMessage("Invalid product ID"),
  validatorMiddleware,
];

export const updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid product ID"),
  validatorMiddleware,
];

export const deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid product ID"),
  validatorMiddleware,
];
