import express from "express";
import {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
} from "../utils/validators/userValidator.js";

import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  resizeImage,
  changeUserPassword,
} from "../services/userService.js";

const router = express.Router();

// http://localhost:8000/api/v1/users

router.put("/changePassword/:id", changeUserPassword);

router
  .route("/")
  .get(getUsers)
  .post(uploadUserImage, resizeImage, createUserValidator, createUser);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

export default router;
