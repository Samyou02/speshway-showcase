const express = require('express');
const router = express.Router();
const {
  submitContact,
  getSubmissions,
  getSubmission,
  updateSubmissionStatus,
  replyToSubmission,
  deleteSubmission,
  upload
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.post('/submit', upload.single('resume'), submitContact);

// Admin routes (protected)
router.get('/submissions', protect, admin, getSubmissions);
router.get('/submission/:id', protect, admin, getSubmission);
router.put('/submission/:id/status', protect, admin, updateSubmissionStatus);
router.post('/submission/:id/reply', protect, admin, replyToSubmission);
router.delete('/submission/:id', protect, admin, deleteSubmission);

module.exports = router;