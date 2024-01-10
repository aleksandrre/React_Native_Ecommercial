// controllers/authController.js
import jwt from "jsonwebtoken";
import { User } from "../models/usersModel.js";
import { RefreshToken } from "../models/refreshTokens.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/authUtils.js";

export async function login(req, res) {
  console.log("shevida loginshi");
  try {
    // Extract username and password from the request body
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!user.emailVerified) {
      return res.status(401).json({ message: "Invalid emailVerified " });
    }
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    await RefreshToken.deleteMany();
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const newRefreshToken = new RefreshToken({
      token: refreshToken,
      userId: user._id,
    });
    await newRefreshToken.save();
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function token(req, res) {
  const refreshToken = req.body.token;
  if (refreshToken == null) {
    return res.status(401).send("Refresh token is missing or invalid.");
  }
  const existingRefreshToken = await RefreshToken.findOne({
    token: refreshToken,
  });

  if (!existingRefreshToken) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken(user);
    res.json({ accessToken: accessToken });
  });
}

export async function logout(req, res) {
  try {
    const refreshToken = req.body.token;

    // Check if the refresh token is provided
    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "Refresh token is missing or invalid." });
    }

    // Find and delete the refresh token from the database
    const deletedRefreshToken = await RefreshToken.findOneAndDelete({
      token: refreshToken,
    });

    // Check if the refresh token existed and was successfully deleted
    if (!deletedRefreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Successfully logged out, send response
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//get the user profile
export const getUser = async (req, res) => {
  console.log("akaaa");
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
};
