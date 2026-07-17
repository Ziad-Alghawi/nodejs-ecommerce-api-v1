import express from "express";
import {
  signupValidator,
  loginValidator,
} from "../utils/validators/authValidator.js";

import {
  signup,
  login,
  forgotPassword,
  verifyPassResetCode,
  resetPassword,
} from "../services/authService.js";

const router = express.Router();

router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);
router.post("/forgotpassword", forgotPassword);
router.post("/verifyResetCode", verifyPassResetCode);
router.put("/resetpassword", resetPassword);

export default router;
