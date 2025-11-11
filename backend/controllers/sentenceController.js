const Sentence = require('../models/Sentence');

// @desc    Get all sentences
// @route   GET /api/sentences
// @access  Public
const getSentences = async (req, res) => {
  try {
    const sentences = await Sentence.find({}).sort({ recordedAt: -1 });
    res.json(sentences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single sentence
// @route   GET /api/sentences/:id
// @access  Public
const getSentence = async (req, res) => {
  try {
    const sentence = await Sentence.findById(req.params.id);
    if (!sentence) {
      return res.status(404).json({ message: 'Sentence not found' });
    }
    res.json(sentence);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create sentence
// @route   POST /api/sentences
// @access  Public
const createSentence = async (req, res) => {
  try {
    const sentence = new Sentence({
      text: req.body.text,
      url: req.body.url,
      userAgent: req.headers['user-agent'] || '',
      timestamp: req.body.timestamp || new Date()
    });
    const createdSentence = await sentence.save();
    res.status(201).json(createdSentence);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update sentence
// @route   PUT /api/sentences/:id
// @access  Private/Admin
const updateSentence = async (req, res) => {
  try {
    const sentence = await Sentence.findById(req.params.id);
    if (!sentence) {
      return res.status(404).json({ message: 'Sentence not found' });
    }

    Object.assign(sentence, req.body);
    const updatedSentence = await sentence.save();
    res.json(updatedSentence);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete sentence
// @route   DELETE /api/sentences/:id
// @access  Private/Admin
const deleteSentence = async (req, res) => {
  try {
    const sentence = await Sentence.findById(req.params.id);
    if (!sentence) {
      return res.status(404).json({ message: 'Sentence not found' });
    }

    await sentence.deleteOne();
    res.json({ message: 'Sentence removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSentences,
  getSentence,
  createSentence,
  updateSentence,
  deleteSentence
};
