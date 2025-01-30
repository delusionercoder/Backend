import express from 'express';
import { addLawyer } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js'; // For handling file uploads

const adminRouter = express.Router();

// Define the POST endpoint to add a lawyer
adminRouter.post("/add-lawyer", upload.single("image"), addLawyer);

export default adminRouter;
//update