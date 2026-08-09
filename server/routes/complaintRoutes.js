// server/routes/complaintRoutes.js
import express from 'express';
import upload, { uploadToCloudinary } from '../middlewares/uploadMiddleware.js';
import Complaint from '../models/Complaint.js';

// Import our active native background processing task engine
import { processComplaintBackground } from '../workers/complaintWorker.js';

const router = express.Router();

// 🚀 PATH: POST /api/v1/complaints/raise
router.post('/raise', upload.single('image'), async (req, res) => {
  const { citizenName, issueDescription, longitude, latitude, manualAddress } = req.body;

  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please upload an image file of the road damage.' });
  }

  if (!longitude || !latitude) {
    return res.status(400).json({ success: false, message: 'GPS coordinates (longitude and latitude) are required.' });
  }

  console.log('⚡ Streaming image file package directly to Cloudinary...');
  const imageUrl = await uploadToCloudinary(req.file);
  console.log(`📸 Asset hosted cleanly on Cloudinary: ${imageUrl}`);

  // Save the report with an initial state of 'pending' inside MongoDB
  const newComplaint = new Complaint({
    citizenName: citizenName || 'Anonymous Citizen',
    issueDescription: issueDescription || '',
    imageUrl,
    location: {
      type: 'Point',
      coordinates: [parseFloat(longitude), parseFloat(latitude)], // GeoJSON format order: [longitude, latitude]
      manualAddress: manualAddress || ''
    },
    aiAnalysis: {
      status: 'pending',
      severity: 'Unassigned',
      analysisDetail: 'Complaint captured successfully. Processing background AI validation routines...'
    }
  });

  await newComplaint.save();

  // Convert the file buffer to a base64 string package for background delivery
  const base64BufferString = req.file.buffer.toString('base64');

  // Trigger our background worker to handle the heavy AI classification work in the background!
  console.log(`⚡ Offloading complaint ID [${newComplaint._id}] to background execution thread...`);
  processComplaintBackground(newComplaint._id, base64BufferString, req.file.mimetype);

  // Fast response return transmission loop back out to citizen client (HTTP 202 Accepted)
  // The user gets their answer instantly, while the AI finishes scanning the image in the background!
  res.status(202).json({
    success: true,
    message: 'Complaint submitted successfully! Image offloaded for background AI analysis.',
    data: newComplaint
  });
});

export default router;
