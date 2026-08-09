// server/middlewares/uploadMiddleware.js
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary with your secure credentials from your .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer to hold files temporarily in RAM buffer memory
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Security Block: Uploaded file must be an image format!'), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Max 5MB file capacity limits
});

// 🚀 FIXED: Converts the entire file object into a Base64 string for a perfect upload
export const uploadToCloudinary = async (file) => {
  try {
    // Convert buffer to base64 string syntax structure
    const base64Image = file.buffer.toString('base64');
    const dataURI = `data:${file.mimetype};base64,${base64Image}`;

    // Execute standard upload API profile
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'pothole_radar_complaints',
      resource_type: 'auto'
    });

    return result.secure_url; // Returns your secure https:// link cleanly!
  } catch (error) {
    console.error("❌ Cloudinary Internal Engine Rejection:", error.message);
    throw new Error(`Cloudinary Core Fault: ${error.message}`);
  }
};

export default upload;
