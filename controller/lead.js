const Leads = require('../models/lead'); // Adjust the path as needed

exports.createLead = async (req, res) => {
  try {
    console.log('Received lead data:', req.body);

    // Create a new lead instance with request data
    const newLead = new Leads(req.body);

    // Save to DB
    const savedLead = await newLead.save();

    // Send success response
    res.status(201).json({
      message: 'Lead created successfully',
      data: savedLead,
    });
  } catch (error) {
    console.error('Error creating lead:', error);

    // Handle duplicate email error (unique constraint)
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({
        message: 'Email already exists',
      });
    }

    res.status(500).json({
      message: 'Failed to create lead',
      error: error.message,
    });
  }
};


  exports.testApi = (req, res) => {
    res.status(200).json({
      message: 'API is working fine!',
    });
  };
  