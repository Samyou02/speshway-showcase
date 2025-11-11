const express = require('express');
const router = express.Router();
const {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient
} = require('../controllers/clientController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getClients).post(protect, admin, createClient);
router.route('/:id').get(getClient).put(protect, admin, updateClient).delete(protect, admin, deleteClient);

module.exports = router;
