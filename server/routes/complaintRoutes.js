import express from 'express';
import upload, { uploadToCloudinary } from '../middlewares/uploadMiddleware.js';
import Complaint from '../models/Complaint.js';
import { processComplaintBackground } from '../workers/complaintWorker.js';

const router = express.Router();

router.post('/raise', upload.single('image'), async (req, res) => {
  const { citizenName, issueDescription, longitude, latitude, manualAddress } = req.body;

  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please upload an image file of the road damage.' });
  }

  if (!longitude || !latitude) {
    return res.status(400).json({ success: false, message: 'GPS coordinates (longitude and latitude) are required.' });
  }

  console.log('Uploading Image on Cloudinary');
  const imageUrl = await uploadToCloudinary(req.file);
  console.log(`Image Uploaded on Cloudinay ${imageUrl}`);

  // Saving the data in mongodb 
  const newComplaint = new Complaint({
    citizenName: citizenName || 'Anonymous Citizen',
    issueDescription: issueDescription || '',
    imageUrl,
    location: {
      type: 'Point',
      coordinates: [parseFloat(longitude), parseFloat(latitude)], // GeoJSON format : [longitude, latitude]
      manualAddress: manualAddress || ''
    },
    aiAnalysis: {
      status: 'pending',
      severity: 'Unassigned',
      analysisDetail: 'Complaint received successfully. Processing the complaint...'
    }
  });

  await newComplaint.save();

  // Convert the file buffer to a base64 string 
  const base64BufferString = req.file.buffer.toString('base64');

  // Ai analysis through our AI agent Gemini 3.5 flash model
  console.log(` complaint ID [${newComplaint._id}]`);
  processComplaintBackground(newComplaint._id, base64BufferString, req.file.mimetype);

  // Get the response after ai analysis
  res.status(202).json({
    success: true,
    message: 'Complaint submitted successfully! Image gone for damage analysis.',
    data: newComplaint
  });
});

export default router;
