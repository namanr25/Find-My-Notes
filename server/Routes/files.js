const express = require('express');
const router = express.Router();
const File = require('../models/file'); // Adjust the path as needed

// Endpoint to get the total number of files
router.get('/files/count', async (req, res) => {
  try {
    const totalFiles = await File.countDocuments();
    res.json({ totalFiles });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching total files count' });
  }
});

module.exports = router;