import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import mongoose from 'mongoose';

// App config
const app = express();
const port = process.env.PORT || 4000;

// Configure Mongoose to suppress the deprecation warning
mongoose.set('strictQuery', false);

// Connect to MongoDB and Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API endpoints
app.use('/api/admin', adminRouter);  // Add router for admin functionalities

// Health check endpoint
app.get('/', (req, res) => {
  res.send('API is running fine...');
});

app.listen(port, () => console.log(`Server started on port ${port}`));
