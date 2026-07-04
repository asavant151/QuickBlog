import jwt from "jsonwebtoken";

const optionalAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // It could be an admin token (email-based) or user token (id-based)
            req.user = decoded;
        } catch (error) {
            // Token is invalid, but it's optional, so we just log and continue
            console.log("Optional auth: token invalid or expired");
        }
    }
    next();
}

export default optionalAuth;
