const express = require('express');
const router = express.Router();
const {
  getSentences,
  getSentence,
  createSentence,
  updateSentence,
  deleteSentence
} = require('../controllers/sentenceController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getSentences).post(createSentence);
router.route('/:id').get(getSentence).put(protect, admin, updateSentence).delete(protect, admin, deleteSentence);

module.exports = router;
