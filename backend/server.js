const express = require('express');
 const mongoose = require('mongoose');
 const cors = require('cors');
 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');
 require('dotenv').config();
 const app = express();
 // Middleware
 app.use(cors());
 app.use(express.json());
 // MongoDB Connection
 mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
 // Import Models
 const User = require('./models/User');
 const Organization = require('./models/Organization');
 const HealthRecord = require('./models/HealthRecord');
 // Authentication Middleware
 const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
 };
 // User Registration
 app.post('/api/register', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      dateOfBirth,
      gender,
      phoneNumber,
      address,
      role
    } = req.body;
    // Generate unique health ID
    const healthId = `HC${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      healthId,
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
      gender,
      phoneNumber,
      address,
      role
    });
    await user.save();
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
 });
 // User Login
 app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
 });
 // Get User Profile
 app.get('/api/profile', auth, async (req, res) => {
  res.json(req.user);
 });
 // Create Health Record
 app.post('/api/health-records', auth, async (req, res) => {
  try {
    const record = new HealthRecord({
      ...req.body,
      patientId: req.body.patientId || req.user._id
    });
    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
 });
 // Get Health Records
 app.get('/api/health-records', auth, async (req, res) => {
  try {
    const records = await HealthRecord.find({ patientId: req.user._id })
      .populate('organizationId', 'name');
    res.json(records);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
 });