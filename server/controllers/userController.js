import jwt from "jsonwebtoken";
import fs from "fs";
import User from "../models/User.js";
import imagekit from "../configs/imageKit.js";

// Register user
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, avatar } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing required fields" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists with this email" });
        }

        const user = await User.create({ name, email, password, avatar });

        const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return res.json({
            success: true,
            message: "Registration successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};

// Login user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Missing required fields" });
        }

        const user = await User.findOne({ email });
        
        if (!user || !user.verifyPassword(password)) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};

// Get User Profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        return res.json({ success: true, user });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};

// Update User Profile (Avatar)
export const updateProfile = async (req, res) => {
    try {
        const imageFile = req.file;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (imageFile) {
            const fileBuffer = fs.readFileSync(imageFile.path);
            
            const response = await imagekit.upload({
                file: fileBuffer,
                fileName: imageFile.originalname,
                folder: "/users/avatars",
            });

            const optimizedImageUrl = imagekit.url({
               path: response.filePath,
               transformation: [
                {quality: "auto"},
                {format: "webp"},
                {width: '200', height: '200', crop: "maintain_ratio"}
               ]
            });

            user.avatar = optimizedImageUrl;
        }

        // We can also allow name update
        if (req.body.name) {
            user.name = req.body.name;
        }

        await user.save();

        return res.json({ 
            success: true, 
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}
