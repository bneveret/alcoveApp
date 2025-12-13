require('dotenv').config();
const express = require('express');
const connectDB = require('./config/mongoose');

const app = express();

// Connect to MongoDB
connectDB();

// Core middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Placeholder for routes (Phase 2)
const postsRoutes = require('./routes/posts.routes');
const moodRoutes = require('./routes/mood.routes');
const supportRoutes = require('./routes/support.routes');

app.use('/api/posts', postsRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/support', supportRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
