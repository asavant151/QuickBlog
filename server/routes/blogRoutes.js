import express from "express";
import { addBlog, deleteBlogById, getAllBlogs, getBlogById, togglePublish, addComment, getBlogComments, addContactMessage, addSubscriber, uploadQuillImage } from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";
import optionalAuth from "../middleware/optionalAuth.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single("image"), auth, addBlog);
blogRouter.post("/delete", auth, deleteBlogById);
blogRouter.post("/toggle-publish", auth, togglePublish);
blogRouter.post("/upload-image", auth, upload.single("image"), uploadQuillImage);
blogRouter.get("/all", optionalAuth, getAllBlogs);
blogRouter.get("/:blogId", optionalAuth, getBlogById);

blogRouter.post("/add-comment", addComment);
blogRouter.post("/comments", getBlogComments);
blogRouter.post("/contact", addContactMessage);
blogRouter.post("/subscribe", addSubscriber);

export default blogRouter;
