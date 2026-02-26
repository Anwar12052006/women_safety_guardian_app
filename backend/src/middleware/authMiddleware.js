import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {

  try {

    // 1 get tken from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];



    // 2️ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }



    // 3️ Check user exists in database
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }



    // 4️ Attach user to request
    req.user = {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };



    // 5️ Allow access to next controller
    next();

  } catch (error) {

    console.error("Auth Middleware Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Authentication failed. Invalid or expired token.",
    });

  }

};

export default authMiddleware;
