// server/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

export const protectOfficerRoute = async (req, res, next) => {
  let token;

  // 1. Inspect incoming network headers for a secure Authorization Bearer token entry
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the raw token string out of the header wrapper (e.g., "Bearer token_string")
      token = req.headers.authorization.split(' ')[1];

      // 2. Decode and verify token signature authenticity against our secure system key
      const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Security Boundary: Confirm that the user role payload claims match 'Officer' status
      if (decodedPayload.role !== 'Officer') {
        return res.status(403).json({ 
          success: false, 
          message: 'Access Denied: Government Clearance Required. Your role is unauthorized.' 
        });
      }

      // Append decoded officer details directly to the request scope for tracking purposes
      req.officer = decodedPayload;
      
      // Pass validation checkpoint successfully - proceed onwards to the controller
      return next();

    } catch (error) {
      console.error('❌ Token Verification Exception Caught:', error.message);
      return res.status(401).json({ success: false, message: 'Security Block: Transmission token has expired or is invalid.' });
    }
  }

  // Fallback rejection layer if no token was attached to the request headers
  if (!token) {
    return res.status(401).json({ success: false, message: 'Security Block: Access token credential payload is entirely missing.' });
  }
};
