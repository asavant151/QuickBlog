import express from "express";
import { registerUser, loginUser, getUserProfile, updateProfile } from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", auth, getUserProfile);
userRouter.put("/profile", auth, upload.single("avatar"), updateProfile);

export default userRouter;
