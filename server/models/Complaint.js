import mongoose from 'mongoose';

const ComplaintSchema = new mongoose.Schema({
  citizenName: { 
    type: String, 
    default: 'Anonymous Citizen' 
  },
  issueDescription: { 
    type: String, 
    required: [true, 'Please provide an issue description text.'] 
  },
  imageUrl: { 
    type: String, 
    required: [true, 'Road damage image upload is strictly required.'] 
  }, 
  location: {
    type: {
      type: String,
      enum: ['Point'], 
      required: true
    },
    coordinates: {
      type: [Number], 
      required: true
    },
    manualAddress: {
      type: String,
      default: '' 
    }
  },
  
  aiAnalysis: {
    status: { 
      type: String, 
      enum: ['pending', 'processing', 'completed', 'failed'], 
      default: 'pending' 
    },
    severity: { 
      type: String, 
      enum: ['Severe', 'Moderate', 'Less', 'Spam', 'Unassigned'], 
      default: 'Unassigned' 
    },
    analysisDetail: { 
      type: String, 
      default: '' 
    }
  },

  pwdAction: {
    status: { 
      type: String, 
      enum: ['Reported', 'Seen', 'Work in Progress', 'Done'], 
      default: 'Reported' 
    },
    officerComment: { 
      type: String, 
      default: '' 
    },
    lastUpdatedBy: { 
      type: String, 
      default: '' 
    }
  },

  upvotes: { 
    type: Number, 
    default: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });


ComplaintSchema.index({ location: '2dsphere' });

const Complaint = mongoose.model('Complaint', ComplaintSchema);
export default Complaint;
