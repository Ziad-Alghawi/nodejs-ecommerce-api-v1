import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import ApiError from "../utils/apiError.js";

import User from "../models/userModel.js";

const createToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });

// @desc Signup a new user
// @route POST /api/v1/signup
// @access Public
export const signup = asyncHandler(async (req, res) => {
  // 1- Create user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password, // no need to hash it cuz we already hashed it in the userModel using pre save middleware
  });

  // 2- Generate token
  const token = createToken(user._id);

  res.status(201).json({ data: user, token });
});

export const login = asyncHandler(async (req, res, next) => {
  // 1- check if email and password in the request body
  // 2- check if user exists & password is correct
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }
  // 3- generate token
  const token = createToken(user._id);

  // 4- send response to client side
  res.status(200).json({ data: user, token });
});
