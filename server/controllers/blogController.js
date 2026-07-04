import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import Contact from "../models/Contact.js";
import Subscriber from "../models/Subscriber.js";

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;
        
        if (!title) return res.json({ success: false, message: "Title is required" });
        if (!subTitle) return res.json({ success: false, message: "SubTitle is required" });
        if (!description) return res.json({ success: false, message: "Description is required" });
        if (!category) return res.json({ success: false, message: "Category is required" });
        if (!imageFile) return res.json({ success: false, message: "Image is required" });

        const fileBuffer = fs.readFileSync(imageFile.path);

        // Upload image to ImageKit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs",
        })

        // optimization through imagekit URL transformation
        const optimizedImageUrl = imagekit.url({
           path: response.filePath,
           transformation: [
            {quality: "auto"},  // Auto compression
            {format: "webp"},  // Convert to modern format
            {width: '1280'}   // Optimize image size
           ] 
        })

        const image = optimizedImageUrl;

        await Blog.create({
            title,
            subTitle,
            description,
            category,
            image,
            isPublished
        })

        return res.json({success: true, message: "Blog added successfully" });
        
    } catch (error) {
        console.error(error);
        return res.json({success: false, message: error.message });
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({isPublished: true});
        res.json({success: true, blogs})
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message });
    }
}

export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        if(!blog) {
            return res.json({success: false, message: "Blog not found" });
        }
        res.json({success: true, blog})        
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message });
    }
}

export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);

        // delete all comments associated with the blog
        await Comment.deleteMany({blog: id});

        res.json({success: true, message: "Blog deleted successfully"})        
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message });
    }
}

export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success: true, message: "Blog status updated successfully"})
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message });
    }
}

export const addComment = async (req, res) => {
    try {
        const {blog, name, content} = req.body;
        await Comment.create({blog, name, content});
        res.json({success: true, message: "Comment added successfully"})
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message });
    }
}

export const getBlogComments = async (req, res) => {
    try {
        const {blogId} = req.body;
        const comments = await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1});
        res.json({success: true, comments})
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message });
    }
}


export const addContactMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name) return res.json({ success: false, message: "Name is required" });
        if (!email) return res.json({ success: false, message: "Email is required" });
        if (!message) return res.json({ success: false, message: "Message is required" });
        await Contact.create({ name, email, message });
        res.json({ success: true, message: "Message sent successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

export const addSubscriber = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.json({ success: false, message: "Missing email field" });
        }
        
        // check if subscriber already exists
        const existingSubscriber = await Subscriber.findOne({ email });
        if(existingSubscriber) {
            return res.json({ success: false, message: "Email already subscribed" });
        }
        
        await Subscriber.create({ email });
        res.json({ success: true, message: "Subscribed successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}