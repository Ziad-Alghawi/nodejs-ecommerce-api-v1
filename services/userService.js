import sharp from "sharp";
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";

import * as factory from "./handlersFactory.js";
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
// @access Private
export const getUsers = factory.getAll(User);

//@desc get a specific user by id
// @route GET /api/v1/users/:id
// @access Private

export const getUser = factory.getOne(User);

// @desc Create a new user
// @route POST /api/v1/users
// @access Private
export const createUser = factory.createOne(User);

//@desc  update a specific user by id
// @route PUT /api/v1/users/:id
// @access Private
export const updateUser = factory.updateOne(User);

//@desc  Delete a specific user by id
// @route DELETE /api/v1/users/:id
// @access Private
export const deleteUser = factory.deleteOne(User);
