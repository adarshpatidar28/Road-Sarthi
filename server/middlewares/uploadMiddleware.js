import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configured cloudinary 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// This will use Multer to hold files temporary in RAM buffer memory
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error(' Uploaded file must be an image format!'), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Maximum 5 MB files
});

// Converts file into a Base64 string for a errorless upload
export const uploadToCloudinary = async (file) => {
  try {
    // Convert buffer to base64 string 
    const base64Image = file.buffer.toString('base64');
    const dataURI = `data:${file.mimetype};base64,${base64Image}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'pothole_radar_complaints',
      resource_type: 'auto'
    });

    return result.secure_url; // Returns our URL after uplaoding on cloudinary
  } catch (error) {
    console.error("Cloudinary Internal Failure:", error.message);
    throw new Error(`Cloudinary New Error: ${error.message}`);
  }
};

export default upload;
