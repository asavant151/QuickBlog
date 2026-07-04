import jwt from 'jsonwebtoken';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import Contact from '../models/Contact.js';
import Subscriber from '../models/Subscriber.js';

export const adminLogin = (req, res) => {
    try {
        const { email, password } = req.body;

        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.json({success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({email, role: 'admin'}, process.env.JWT_SECRET, {expiresIn: '1d'});

        return res.json({success: true, message: 'Login successful', token, role: 'admin' });
        
    } catch (error) {
        console.error(error);
        return res.json({success: false, message: error.message });
    }
}

export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({createdAt: -1})
        return res.json({success: true, blogs})
    } catch (error) {
        console.error(error);
        return res.json({success: false, message: error.message });
    }
}

export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({}).populate('blog').sort({createdAt: -1})
        return res.json({success: true, comments})
    } catch (error) {
        console.error(error);
        return res.json({success: false, message: error.message });
    }
}

export const getDashboard = async (req, res) => {
    try {
        const recentBlogs = await Blog.find({}).sort({createdAt: -1}).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({isPublished: false});
        
        const dashboardData = {
            recentBlogs,
            blogs,
            comments,
            drafts
        }
        return res.json({success: true, dashboardData})
    } catch (error) {
        console.error(error);
        return res.json({success: false, message: error.message });
    }
}

export const deleteCommentById = async (req, res) => {
    try {
        const {id} = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({success: true, message: 'Comment deleted successfully'});
    } catch (error) {
        console.error(error);
        return res.json({success: false, message: error.message });
    }
}

export const approveCommentById = async (req, res) => {
    try {
        const {id} = req.body;
        await Comment.findByIdAndUpdate(id, {isApproved: true});
        res.json({success: true, message: 'Comment approved successfully'});
    } catch (error) {
        console.error(error);
        return res.json({success: false, message: error.message });
    }
}

export const getAllContactMessages = async (req, res) => {
    try {
        const contacts = await Contact.find({}).sort({createdAt: -1});
        res.json({success: true, contacts});
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message });
    }
}

export const deleteContactMessage = async (req, res) => {
    try {
        const {id} = req.body;
        await Contact.findByIdAndDelete(id);
        res.json({success: true, message: 'Contact message deleted successfully'});
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message });
    }
}

export const getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find({}).sort({createdAt: -1});
        res.json({success: true, subscribers});
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message });
    }
}

export const deleteSubscriber = async (req, res) => {
    try {
        const {id} = req.body;
        await Subscriber.findByIdAndDelete(id);
        res.json({success: true, message: 'Subscriber deleted successfully'});
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message });
    }
}