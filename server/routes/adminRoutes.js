// server/routes/adminRoutes.js
import express from 'express';
import Complaint from '../models/Complaint.js';
import { protectOfficerRoute } from '../middlewares/authMiddleware.js';

const router = express.Router();

// 🚀 PATH: GET /api/v1/admin/complaints
// Secure Endpoint: Fetches reports sorted by newest first, with optional AI severity and village search filters
router.get('/complaints', protectOfficerRoute, async (req, res) => {
  const { severity, status, searchLocation } = req.query;
  let queryFilters = {};

  // 1. Filter by AI Classification (Severe, Moderate, Less, Spam)
  if (severity) {
    queryFilters['aiAnalysis.severity'] = severity;
  }

  // 2. Filter by PWD Progress Status (Reported, Seen, Work in Progress, Done)
  if (status) {
    queryFilters['pwdAction.status'] = status;
  }

  // 3. Filter by Manual Location: Matches manual text strings for villages, landmarks, or areas
  if (searchLocation) {
    queryFilters['location.manualAddress'] = { $regex: searchLocation, $options: 'i' }; // 'i' makes it case-insensitive
  }

  // Fetch filtered data out of MongoDB and sort it so the newest reports sit right at the top
  const results = await Complaint.find(queryFilters).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: results.length,
    data: results
  });
});

// 🚀 PATH: PATCH /api/v1/admin/complaints/:id/status
// Secure Endpoint: Allows an authorized officer to change repair status and input custom update comments
router.patch('/complaints/:id/status', protectOfficerRoute, async (req, res) => {
  const { status, officerComment } = req.body;
  const complaintId = req.params.id;

  // Security Validation: Ensure incoming status matches allowed states
  const validStatuses = ['Seen', 'Work in Progress', 'Done'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status update option provided.' });
  }

  // Locate the target document inside MongoDB
  const complaint = await Complaint.findById(complaintId);
  if (!complaint) {
    return res.status(404).json({ success: false, message: 'Targeted complaint record not found inside database.' });
  }

  // Update administrative fields safely
  if (status) complaint.pwdAction.status = status;
  if (officerComment !== undefined) complaint.pwdAction.officerComment = officerComment;
  complaint.pwdAction.lastUpdatedBy = req.officer.username; // Pulls from verified JWT token payload signature!

  await complaint.save();

  // 🚀 SOCKET.IO REAL-TIME BROADCAST: Share status modification signals across the network instantly
  const io = req.app.get('socketio');
  io.emit('statusUpdate', {
    complaintId: complaint._id,
    newStatus: complaint.pwdAction.status,
    officerComment: complaint.pwdAction.officerComment,
    message: `📢 PWD Update: Complaint status shifted to [${complaint.pwdAction.status}]`
  });

  console.log(`📡 WebSocket Broadcast fired: Complaint [${complaintId}] updated to [${status}] by ${req.officer.username}`);

  res.status(200).json({
    success: true,
    message: 'Administrative record updated and broadcasted in real-time successfully!',
    data: complaint
  });
});

export default router;
