// Import necessary modules
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
const PORT = 3001;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/email", emailRoutes);
app.use("/addresses", addressRoutes);
app.use("/orders", ordersRoutes);

// Database connection
mongoose
  .connect("mongodb://localhost:27017/", {})
  .then(() => {
    console.log("Successfully connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`App is listening on ${PORT} port`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// async function createAdminUser() {
//   try {
//     // Check if an admin user already exists
//     const existingAdmin = await User.findOne({ isAdmin: true });

//     if (existingAdmin) {
//       console.log("Admin user already exists.");
//       return;
//     }

//     // Generate a random token for email verification

//     // Hash the default admin password using bcrypt
//     const adminPassword = "aleksandre1"; // Change this to a secure password
//     const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);

//     // Create a new admin user with the hashed password and email verification token
//     const adminUser = new User({
//       username: "admin", // Change this to the desired admin username
//       password: hashedAdminPassword,
//       email: "admin@example.com", // Change this to the desired admin email
//       isAdmin: true,
//       emailVerified: true,
//     });

//     // Save the admin user to the database
//     await adminUser.save();

//     console.log("Admin user registered successfully.");
//   } catch (error) {
//     console.error("Error creating admin user:", error);
//   }
// }
// createAdminUser();
