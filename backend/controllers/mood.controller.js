const Mood = require('../models/mood.model');

exports.submitMood = async (req, res) => {
  try {
    const { mood, sessionId } = req.body;

    await Mood.create({ mood, sessionId });
    res.status(201).json({ message: 'Mood recorded' });
  } catch {
    res.status(400).json({ error: 'Invalid mood data' });
  }
};

exports.getMoodStats = async (req, res) => {
  try {
    const range = req.query.range || '7d';
    const days = parseInt(range);
    const since = new Date(
      Date.now() - days * 24 * 60 * 60 * 1000
    );

    const stats = await Mood.aggregate([
      { $match: { createdAt: { $gte: since } } },
      {
        $group: {
          _id: '$mood',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(stats);
  } catch {
    res.status(500).json({ error: 'Failed to load mood stats' });
  }
};
