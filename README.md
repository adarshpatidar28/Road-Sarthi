#  RoadSarthi: Autonomous AI Road Damage Detection & Allocation System

**RoadSarthi** is an enterprise-grade civic infrastructure monitoring platform built on the **MERN Stack** and integrated with **Google Gemini 3.5 Flash Vision AI**. It bridges the gap between everyday citizens and public works departments (PWD) by enabling real-time damage logging, automatic machine-learning severity grading, and immediate administrative workflow dispatch tracking over WebSockets.

---

##  Key Engineering Core Features

*   **Multimodal AI Inference Core**: Processes citizen-uploaded images in an asynchronous background event thread utilizing the Google Gemini API to calculate structural damage parameters (`Severe`, `Moderate`, `Less`, `Spam`) along with contextual analysis descriptions.
*   **Zero-Refresh Real-Time Sync Pipeline**: Built over **Socket.io**. Every status adjustment executed on the PWD control center broadcasts immediate updates to citizen panels instantly without page reloads.
*   **Geospatial Data Framework**: Leverages MongoDB spatial `2dsphere` index schema to log exact hardware GPS coordinates (`GeoJSON Point`) alongside custom regex village/landmark query filters.
*   **Clean Structural Modular Architecture**: Implements clear architectural separation layers. Frontend runs on an interactive multi-page pattern using component scoping; the backend utilizes an asynchronous ES6 Modules router configuration with global crash guard middlewares.

---

## 📂 Project Architecture Blueprint

```text
pothole-radar/
├── server/                    # Express Engine Backend Ecosystem
│   ├── config/                # Connection Profiles (db.js)
│   ├── middlewares/           # Global Error Boundaries & Auth Checkpoints
│   ├── models/                # MongoDB Geospatial Schemas blueprints
│   ├── routes/                # System Business Path Controller Entrypoints
│   ├── workers/               # In-Memory Background Asynchronous AI Core Thread
│   ├── .env                   # Cryptographic Security Passwords File
│   └── server.js              # Central Entrypoint Master Brain
└── client/                    # Vite + React Frontend Dashboard Application
    ├── src/
    │   ├── components/        # Isolated Structural Multi-Page Interface Sheets
    │   ├── App.jsx            # Core Application View Router Hub Controller
    │   └── index.css          # Tailwind CSS Initialization Core Vectors
```

---

## ⚙️ Upstream System Requirements
Before spinning up the application ecosystem on your local machine, ensure you have these runtimes installed:
*   [Node.js](https://nodejs.org) (v18.0.0 or higher recommended)
*   [MongoDB Community Server](https://mongodb.com) active on port `27017`

---

## 🛠️ Step-by-Step Installation & Boot Guide

### 1. Clone and Configure the Application Environment
Open your system terminal prompt window inside your project root master directory folder:

```bash
cd pothole-radar
```

### 2. Establish Backend Ecosystem Secrets
Step inside your `server/` directory folder and pull the node execution modules dependency list:

```bash
cd server
npm install
```

Now, create a file named **`.env`** directly inside the root of your `server/` directory and map your private system variables exactly like this (replace placeholders with your active third-party dashboard token strings):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/pothole_radar
CLIENT_URL=http://localhost:5173

# Cryptographic JSON Web Tokens Security Salt Link Key string
JWT_SECRET=GOVERNMENT_GRADE_INTERNAL_CRYPTOGRAPHIC_SALT_KEY_STENCIL_982

# Google AI Studio Gemini Flash Core Key String
# Generate from: https://google.com
GEMINI_API_KEY=AIzaSyYourActualGoogleAIStudioGeminiKeyStringHere

# Authenticated Free Cloudinary Media Server Keys
# Extract from: https://cloudinary.com
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key_numerical_digits
CLOUDINARY_API_SECRET=your_cloudinary_api_secret_cryptographic_string
```

Launch the hot-reloader nodemon runtime environment to activate the server data pathways:

```bash
npm run dev
```
*Expected terminal callback log:* 
`🚀 Secure Server running on port http://localhost:5000`
`Database connected successfully`

---

### 3. Spin Up the Multi-Page Frontend Panel UI
Open a secondary independent terminal terminal screen window, navigate down to your `client/` workspace subfolder path and boot the compiler engine tool:

```bash
cd ../client
npm install
npm run dev
```
*Expected terminal callback link:* 
`➜  Local:   http://localhost:5173/`

Open **`http://localhost:5173/`** in your internet browser window canvas to access the multi-page portal.

---

## 🧪 System End-to-End Operational Manual

To demonstrate the full technical architecture loop to an interviewer or recruiter, execute these tests step-by-step:

### 1. Citizen Incident Reporting Test
1. Click on the **File New Complaint** card view wrapper panel.
2. Provide your name string details and the issue context summary message details.
3. Click the **Fetch Live Smartphone Location Coordinates** button tool to trigger HTML5 Geolocation services (Allow browser access prompts).
4. Type a landmark location context identifier string index (e.g., `Near Pipariya Crossing, Main Sector Axis`).
5. Choose an image asset file mapping (.jpg/.png) of a pothole or pavement crack, and click **Submit Report Document**.

### 2. Admin Verification Check Gate & Workflow Modification Test
1. Head over to the top header tracking nav layout and click **Official Login**.
2. Pass the secure system authorization parameters credentials text payload exactly:
   * **Username**: `pwd_officer_admin`
   * **Password**: `GovtSecurePassword@2026`
3. Click login to enter the protected database data matrix sheet logging grid.
4. Locate your recent submission. You will see that the background event loop thread has parsed the image, safely posted it to Cloudinary, run the Gemini neural scan, and written an automated severity tier tag (like `Severe`) along with an AI analytical commentary breakdown description text row.
5. In the final action management column, modify the progress selection state dropdown box options from `Reported` ➡️ `Work in Progress`, type an update instruction detail text string in the input field box, and click out or press save.

### 3. WebSocket Real-Time Broadcast Assertion Verification
*   Keep your admin board console tab view screen active.
*   Open an independent secondary browser instance screen line matching your domain URL path (`http://localhost:5173/`) and click on the **Track Complaint Status** tracker board.
*   Whenever the PWD Officer modifies item parameter selections on Tab 1, a real-time floating notification warning dialog pop-up box will bounce into view automatically on Tab 2 with zero page refreshes!

---

## 🏛️ Secure Government System Administration Summary
This platform uses **Role-Based Access Control (RBAC)** security policies enforced through **JSON Web Tokens (JWT)**. 
All modification API endpoint paths under `/api/v1/admin/*` reject connection transmissions with strict `401/403 Forbidden` response statuses unless the connection header contains a valid authorization signature matching a verified government rank (`Officer` role parameter configurations).
