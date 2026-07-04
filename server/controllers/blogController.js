import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import Contact from "../models/Contact.js";
import Subscriber from "../models/Subscriber.js";
import { sendEmail } from "../utils/emailService.js";

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished, isPrivate } = JSON.parse(req.body.blog);
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
            isPublished,
            isPrivate
        })

        if (isPublished) {
            // Notify subscribers
            const subscribers = await Subscriber.find({});
            const emails = subscribers.map(sub => sub.email).join(',');
            if (emails) {
                sendEmail(
                    emails, 
                    `New Blog Published: ${title}`, 
                    `Check out our latest post: ${title}\n\n${subTitle}`,
                    `<h2>Check out our latest post: ${title}</h2><p>${subTitle}</p>`
                );
            }
        }

        return res.json({success: true, message: "Blog added successfully" });
        
    } catch (error) {
        console.error(error);
        return res.json({success: false, message: error.message });
    }
}

export const uploadQuillImage = async (req, res) => {
    try {
        const imageFile = req.file;
        if(!imageFile) return res.json({success: false, message: "No image provided" });

        const fileBuffer = imageFile.buffer.toString("base64");
        
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs/content",
        });

        const optimizedImageUrl = imagekit.url({
           path: response.filePath,
           transformation: [
            {quality: "auto"},
            {format: "webp"}
           ]
        });

        res.json({ success: true, url: optimizedImageUrl });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const query = { isPublished: true };
        if (!req.user) {
            query.isPrivate = { $ne: true }; // guests see blogs where isPrivate is false or missing
        }

        const totalBlogs = await Blog.countDocuments(query);
        const blogs = await Blog.find(query).sort({createdAt: -1}).skip(skip).limit(limit);
        
        res.json({
            success: true, 
            blogs,
            totalPages: Math.ceil(totalBlogs / limit),
            currentPage: page
        });
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
        
        if (blog.isPrivate && !req.user) {
            return res.json({success: false, message: "This blog is private. Please login to read." });
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
        const {blog, name, avatar, content} = req.body;
        await Comment.create({blog, name, avatar, content});
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
        
        // Auto-reply to user
        sendEmail(
            email,
            "We received your message!",
            `Hi ${name},\n\nThank you for reaching out. We have received your message and will get back to you shortly.\n\nBest,\nQuickBlog Team`,
            `<p>Hi ${name},</p><p>Thank you for reaching out. We have received your message and will get back to you shortly.</p><p>Best,<br>QuickBlog Team</p>`
        );

        // Notification to admin
        if (process.env.ADMIN_EMAIL) {
            sendEmail(
                process.env.ADMIN_EMAIL,
                `New Contact Message from ${name}`,
                `You received a new message from ${name} (${email}):\n\n${message}`,
                `<p>You received a new message from <strong>${name}</strong> (${email}):</p><p>${message}</p>`
            );
        }

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
        
        // Welcome email
        sendEmail(
            email,
            "Welcome to QuickBlog Newsletter!",
            "Thank you for subscribing! You will now receive updates when we publish new blogs.",
            "<h2>Welcome!</h2><p>Thank you for subscribing! You will now receive updates when we publish new blogs.</p>"
        );

        res.json({ success: true, message: "Subscribed successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}