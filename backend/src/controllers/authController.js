
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import TrustedContact from "../models/TrustedContact.js";

/**
 * ==========================
 * REGISTER USER
 * ==========================
 */
export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      role = "user",
      location,
      badgeId,
    } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    // Basic validation
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    // Prevent public creation of admin/police
    const allowedRoles = ["user", "family"];
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized role assignment",
      });
    }

    // Check existing user
    // const existingUser = await User.findOne({ email }).lean();
    const existingUser = await User.findOne({
      email: normalizedEmail,
    }).lean();
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email: normalizedEmail,
      phone,
      password: hashedPassword,
      role,
      location,
      badgeId: role === "police" ? badgeId : undefined,
    });

    /**
 * =========================================
 * AUTO LINK GUARDIAN IF INVITE EXISTS
 * =========================================
 */

  const pendingInvite = await TrustedContact.findOne({
    contactEmail: normalizedEmail,
    status: "pending",
  });

  if (pendingInvite) {
    // Update invite record
    pendingInvite.contact = newUser._id;
    pendingInvite.status = "accepted";
    pendingInvite.respondedAt = new Date();
    await pendingInvite.save();

    // Update user role to family
    await User.findByIdAndUpdate(newUser._id, {
      role: "family",
      owner: pendingInvite.owner,
    });

    newUser.role = "family";
  }

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

/**
 * ==========================
 * LOGIN USER
 * ==========================
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    // Only fetch required fields (optimized query)
    // const user = await User.findOne({ email })
    //   .select("+password name role email isVerified")
    //   .lean();

    const user = await User.findOne({ email })
  .select("+password name role email isVerified owner familyId")
  .lean();

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Optional: block unverified police
    if (user.role === "police" && !user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Police account not verified",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        owner: user.owner || null,
        familyId: user.familyId || null,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};