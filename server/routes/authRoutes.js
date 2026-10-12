// server/routes/authRoutes.js
import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// 🚀 PATH: POST /api/v1/auth/officer-login
router.post('/officer-login', async (req, res) => {
  const { username, password } = req.body;

  // 1. Establish strict server-side credentials for PWD officials
  const OFFICIAL_USERNAME = "adarsh_patidar_28";
  const OFFICIAL_PASSWORD = "Adarsh@123"; // High-strength master credential check

  // 2. Security Check: Validate incoming text data matching parameters
  if (username !== OFFICIAL_USERNAME || password !== OFFICIAL_PASSWORD) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication Failure: Invalid Government Credentials Entered.' 
    });
  }

  console.log(`🔐 Successful secure administrative login access granted to user: ${username}`);

  // 3. Formulate secure JWT claim data payload profile details
  const tokenPayload = {
    username: OFFICIAL_USERNAME,
    department: "Public Works Department (PWD)",
    role: "Officer" // Injects access control role identifier parameter
  };

  // 4. Cryptographically sign token container, valid for an 8 hour work shift duration window
  const sessionToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '8h' });

  res.status(200).json({
    success: true,
    message: 'Authentication successful. Officer session initiated.',
    token: sessionToken, // Return this token string back to the Client screen
    role: "Officer"
  });
});

export default router;
