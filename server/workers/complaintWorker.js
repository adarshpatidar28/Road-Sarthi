// server/workers/complaintWorker.js
import { GoogleGenAI, Type } from '@google/genai';
import Complaint from '../models/Complaint.js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

console.log('🤖 Native Asynchronous Background Task Engine active and waiting for events...');

// 🚀 RECRUITER FALLBACK: A production-grade asynchronous in-memory background worker function
export const processComplaintBackground = async (complaintId, fileBufferBase64, mimeType) => {
  console.log(`📦 Background Engine captured task: Processing Complaint ID [${complaintId}]`);

  // We deliberately use an immediate setTimeout so the main Express route can finish 
  // and respond to the citizen instantly without blocking the user!
  setTimeout(async () => {
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) return;

    try {
      // 1. Advance status flag inside MongoDB to 'processing'
      complaint.aiAnalysis.status = 'processing';
      await complaint.save();

      const prompt = `
        Analyze this image of a road surface. Identify if there is physical damage present such as a pothole, fissure, pit, road depression, or structural cracking.
        Classify the visual damage into exactly one of these distinct categories: 'Severe', 'Moderate', 'Less', or 'Spam' (use Spam only if the image does not represent any form of road infrastructure, pavement, or surface damage).
      `;

      console.log(`🤖 Triggering Google Gemini Vision classification model for Complaint [${complaintId}]...`);
      
      // 2. Fire the asynchronous Gemini Vision AI inference request
      const aiResponse = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: [
          prompt,
          { inlineData: { data: fileBufferBase64, mimeType: mimeType } }
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              severity: { type: Type.STRING, enum: ["Severe", "Moderate", "Less", "Spam"] },
              analysisDetail: { type: Type.STRING }
            },
            required: ["severity", "analysisDetail"]
          }
        }
      });

      const parsedAIResult = JSON.parse(aiResponse.text.trim());
      console.log(`✅ AI Background Classification Metrics Computed for [${complaintId}]:`, parsedAIResult);

      // 3. Save findings directly back into MongoDB permanently
      complaint.aiAnalysis = {
        status: 'completed',
        severity: parsedAIResult.severity || 'Less',
        analysisDetail: parsedAIResult.analysisDetail || 'Analysis executed successfully.'
      };
      await complaint.save();

    } catch (error) {
      console.error(`❌ Background Process Error for [${complaintId}]:`, error.message);
      complaint.aiAnalysis = {
        status: 'failed',
        severity: 'Unassigned',
        analysisDetail: `In-Memory processing queue exception: ${error.message}`
      };
      await complaint.save();
    }
  }, 0); // Executes immediately on the next event loop tick, running asynchronously in the background!
};
