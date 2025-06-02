const mongoose = require('mongoose');

const leadsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  graduationYear: {
    type: Number,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
    trim: true,
  },
  totalExperienceYears: {
    type: Number,
    required: true,
    min: 0,
  },
  resume: { 
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Leads', leadsSchema);
