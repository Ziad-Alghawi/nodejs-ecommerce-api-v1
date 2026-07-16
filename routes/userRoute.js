import express from "express";
import { protect, allowedTo } from "../services/authService.js";
import {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
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

router.put(
  "/changePassword/:id",
  changeUserPasswordValidator,
  changeUserPassword,
);

router
  .route("/")
  .get(protect, allowedTo("admin", "manager"), getUsers)
  .post(
    protect,
    allowedTo("admin"),
    uploadUserImage,
    resizeImage,
    createUserValidator,
    createUser,
  );
router
  .route("/:id")
  .get(protect, allowedTo("admin"), getUserValidator, getUser)
  .put(
    protect,
    allowedTo("admin"),
    uploadUserImage,
    resizeImage,
    updateUserValidator,
    updateUser,
  )
  .delete(protect, allowedTo("admin"), deleteUserValidator, deleteUser);

export default router;
