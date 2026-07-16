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
// @route POST /api/v1/auth/signup
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

// @desc Login a user
// @route POST /api/v1/auth/login
// @access Public
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

// @desc Make sure the user is logged in and protect the route
export const protect = asyncHandler(async (req, res, next) => {
  // 1- check if token exists >> if exists, get it
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log(token);
  }
  if (!token) {
    return next(
      new ApiError(
        "You are not logged in, please login to get access for this route",
        401,
      ),
    );
  }

  // 2- verify token (no changes happened on it -- and not expired)
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // 3- check if user exists
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError(
        "The user belonging to this token does no longer exist",
        401,
      ),
    );
  }
  // 4- check if user changed password after token was issued
  if (currentUser.passwordChangedAt) {
    const passwordChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10,
    );
    //Password changed after token was issued
    if (passwordChangedTimestamp > decoded.iat) {
      return next(
        new ApiError("User recently changed password! Please login again", 401),
      );
    }
  }
  req.user = currentUser; // add user data to request object
  next();
});

// ["admin", "manager"]
export const allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    // 1- access roles
    //2- access registered user(req.user.role)
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You are not allowed to access this route", 403),
      );
    }
    next();
  });
