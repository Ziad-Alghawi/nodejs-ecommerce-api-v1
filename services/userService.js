import sharp from "sharp";
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

import * as factory from "./handlersFactory.js";
import ApiError from "../utils/apiError.js";
import { uploadSingleImage } from "../middlewares/uploadImageMiddleware.js";

import User from "../models/userModel.js";

// uplosad single image
export const uploadUserImage = uploadSingleImage("profileImage");

// image processing
export const resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(800, 800)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/users/${filename}`);

    // save image into our db
    req.body.profileImage = filename;
  }

  next();
});

// @desc Get list of users
// @route GET /api/v1/users
// @access Private/admin
export const getUsers = factory.getAll(User);

//@desc get a specific user by id
// @route GET /api/v1/users/:id
// @access Private/admin
export const getUser = factory.getOne(User);

// @desc Create a new user
// @route POST /api/v1/users
// @access Private/admin
export const createUser = factory.createOne(User);

//@desc  update a specific user by id
// @route PUT /api/v1/users/:id
// @access Private/admin
export const updateUser = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      email: req.body.email,
      phone: req.body.phone,
      profileImage: req.body.profileImage,
      role: req.body.role,
    },
    {
      new: true,
    },
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id} `, 404));
  }
  res.status(200).json({ data: document });
});

export const changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    },
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id} `, 404));
  }
  res.status(200).json({ data: document });
});

//@desc  Delete a specific user by id
// @route DELETE /api/v1/users/:id
// @access Private/admin
export const deleteUser = factory.deleteOne(User);
