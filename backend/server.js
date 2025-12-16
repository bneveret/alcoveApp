require('dotenv').config();
require('./config/mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

// Import routes
const postsRoutes = require('./routes/posts.routes');
const moodRoutes = require('./routes/mood.routes');

app.use('/api/posts', postsRoutes);
app.use('/api/mood', moodRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
