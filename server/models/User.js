import mongoose from "mongoose";
import CryptoJS from "crypto-js";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: {type: String, default: ""},
    role: {type: String, enum: ['user', 'admin'], default: 'user'}
}, {timestamps: true});

// Method to verify password
userSchema.methods.verifyPassword = function(enteredPassword) {
    const hash = CryptoJS.SHA256(enteredPassword).toString();
    return this.password === hash;
};

// Middleware to hash password before saving
userSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = CryptoJS.SHA256(this.password).toString();
    next();
});

const User = mongoose.model("User", userSchema);

export default User;
