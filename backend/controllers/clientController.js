const Client = require('../models/Client');

// @desc    Get all clients
// @route   GET /api/clients
// @access  Public (or Private/Admin if all=true query param)
const getClients = async (req, res) => {
  try {
    // If user is admin and requests all clients (including inactive)
    // req.user will be set if protect middleware was used, otherwise undefined
    const isAdmin = req.user && (req.user.role === 'admin' || req.user.role === 'hr');
    const showAll = req.query.all === 'true' && isAdmin;
    const query = showAll ? {} : { isActive: true };
    const clients = await Client.find(query).sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single client
// @route   GET /api/clients/:id
// @access  Public
const getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create client
// @route   POST /api/clients
// @access  Private/Admin
const createClient = async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.name || !req.body.name.trim()) {
      return res.status(400).json({ message: 'Client name is required' });
    }

    // Clean up empty strings to use defaults
    const clientData = {
      name: req.body.name.trim(),
      logo: req.body.logo?.trim() || '',
      website: req.body.website?.trim() || '',
      description: req.body.description?.trim() || '',
      isActive: req.body.isActive !== undefined ? req.body.isActive : true
    };

    const client = new Client(clientData);
    const createdClient = await client.save();
    res.status(201).json(createdClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update client
// @route   PUT /api/clients/:id
// @access  Private/Admin
const updateClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Clean up empty strings
    const updateData = {
      name: req.body.name?.trim(),
      logo: req.body.logo?.trim() || '',
      website: req.body.website?.trim() || '',
      description: req.body.description?.trim() || '',
      isActive: req.body.isActive !== undefined ? req.body.isActive : client.isActive
    };

    Object.assign(client, updateData);
    client.updatedAt = new Date();
    const updatedClient = await client.save();
    res.json(updatedClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete client
// @route   DELETE /api/clients/:id
// @access  Private/Admin
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    await client.deleteOne();
    res.json({ message: 'Client removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient
};
