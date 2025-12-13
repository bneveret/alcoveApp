const Post = require('../models/post.model');

const supportMap = new Map();

exports.supportPost = async (req, res) => {
  const postId = req.params.id;
  const sessionId = req.headers['x-session-id'];

  if (!sessionId) {
    return res.status(400).json({
      error: 'Missing session identifier'
    });
  }

  const key = `${postId}:${sessionId}`;

  if (supportMap.has(key)) {
    return res.status(409).json({
      error: 'Already supported'
    });
  }

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $inc: { supportCount: 1 } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    supportMap.set(key, true);
    res.json({ supportCount: post.supportCount });
  } catch {
    res.status(400).json({ error: 'Support failed' });
  }
};
