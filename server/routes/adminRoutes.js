import express from "express";
import { adminLogin, getAllBlogsAdmin, getAllComments, getDashboard, deleteCommentById, approveCommentById, getAllContactMessages, deleteContactMessage, getAllSubscribers, deleteSubscriber } from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", auth, getAllComments);
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.post("/delete-comment", auth, deleteCommentById);
adminRouter.post("/approve-comment", auth, approveCommentById);
adminRouter.get("/dashboard", auth, getDashboard);
adminRouter.get("/contacts", auth, getAllContactMessages);
adminRouter.post("/delete-contact", auth, deleteContactMessage);
adminRouter.get("/subscribers", auth, getAllSubscribers);
adminRouter.post("/delete-subscriber", auth, deleteSubscriber);

export default adminRouter;
