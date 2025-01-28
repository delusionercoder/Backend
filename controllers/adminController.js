import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import lawyerModel from "../models/lawyerModel.js";

// Controller for adding a lawyer
const addLawyer = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file; // For image upload

    // Validate the required fields
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing required details" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Validate strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter strong password" });
    }

    // Hash the lawyer's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Handle image upload to Cloudinary if image is provided
    let imageUrl = '';
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      imageUrl = imageUpload.secure_url;
    }

    // Handle address (optional)
    let parsedAddress = {};
    if (address) {
      // Attempt to parse the address as JSON
      try {
        parsedAddress = JSON.parse(address);
      } catch (err) {
        return res.json({
          success: false,
          message: "Address format is incorrect. Please provide a valid JSON string.",
        });
      }
    }

    // Create a new lawyer object
    const lawyerData = {
      name,
      email,
      password: hashedPassword,
      image: imageUrl || null, // Set image to null if not provided
      speciality,
      degree,
      experience,
      about,
      fees,
      address: parsedAddress, // Use parsed address
      date: Date.now(),
    };

    // Save the lawyer data to the database
    const newLawyer = new lawyerModel(lawyerData);
    await newLawyer.save();

    res.json({ success: true, message: "Lawyer Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding lawyer" });
  }
};

export { addLawyer };
