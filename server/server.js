// server/server.js

// 1. Core Imports
import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import 'express-async-errors'; 
import dotenv from 'dotenv';

// 🔌 Connection Profile Imports
import connectDB from './config/db.js';

// 🛣️ Route Component Imports
import complaintRoutes from './routes/complaintRoutes.js';
import './workers/complaintWorker.js';

// 2. Activate Configurations
dotenv.config();

// 🚀 Fire up the secure MongoDB baseline link immediately
connectDB();

const app = express();
const server = http.createServer(app);

// 3. Configure Real-Time WebSockets Engine (Socket.io)
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PATCH"]
  }
});

const PORT = process.env.PORT || 5000;

// 4. Attach Universal Server Rules (Middlewares)
app.use(cors()); 
app.use(express.json()); 

// Attach the WebSockets channel globally
app.set('socketio', io);

// 5. Build a Basic Real-Time Network Test Handshake
io.on('connection', (socket) => {
  console.log(`🔌 Secure real-time network link active with Client: ${socket.id}`);
  
  socket.on('disconnect', () => {
    console.log(`🔌 Client dropped real-time connection link: ${socket.id}`);
  });
});

// 6. Base Verification Health Checks Route
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    status: "active",
    architecture: "MERN Stack Core (ES Modules)",
    message: "The application backend infrastructure is fully operational!" 
  });
});

// 🛣️ 7. Register Global API Business Logic Routes Pathways
app.use('/api/v1/complaints', complaintRoutes);

// 8. Global Crash Guard Protection (Central Error Handler Middleware)
app.use((err, req, res, next) => {
  console.error("❌ Critical Guard Layer Caught System Error:", err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "An unexpected error occurred in the core server background."
  });
});

// 9. Fire Up the Server Engine
server.listen(PORT, () => {
  console.log(`🚀 Secure Server running on port http://localhost:${PORT}`);
});
