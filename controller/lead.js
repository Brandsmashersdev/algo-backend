const Leads = require('../models/lead');


exports.createLead = async (req, res) => {
  try {
    console.log('Received lead data:', req.body);
    const { name, email, resume } = req.body;

    if (!name || !email || !resume) {
      return res.status(400).json({
        message: 'Name, email, and resume URL are required.',
      });
    }
    req.body.email = email.trim().toLowerCase();

    const newLead = new Leads(req.body);
    const savedLead = await newLead.save();

    return res.status(201).json({
      message: 'Lead created successfully',
      data: savedLead,
    });
  } catch (error) {
    console.error('Error creating lead:', error);

    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(409).json({
        message: 'Email already exists',
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        message: 'Validation failed',
        errors: messages,
      });
    }

    // General server error fallback
    return res.status(500).json({
      message: 'An error occurred while creating the lead',
      error: error.message,
    });
  }
};


  exports.testApi = (req, res) => {
    res.status(200).json({
      message: 'API is working fine!',
    });
  };
  