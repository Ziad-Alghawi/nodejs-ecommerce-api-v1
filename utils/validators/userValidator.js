import slugify from "slugify";
import { check, body } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware.js";
import User from "../../models/userModel.js";

export const createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("User name required")
    .isLength({ min: 3 })
    .withMessage("Too short user name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check("email")
    .notEmpty()
    .withMessage("User email required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("E-mail already in use"));
        }
      }),
    ),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),

  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password confirmation is required"),

  check("phone")
    .optional()
    .isMobilePhone("de-DE")
    .withMessage("Invalid phone number only accepted German numbers "),

  check("profileImage").optional(),

  check("role").optional(),

  validatorMiddleware,
];

export const getUserValidator = [
  //Rule number 1 to check if the id is a valid MongoDB ObjectId
  check("id").isMongoId().withMessage("Invalid User ID format"),
  validatorMiddleware,
];

export const updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid User ID format"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

export const deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid User ID format"),
  validatorMiddleware,
];
