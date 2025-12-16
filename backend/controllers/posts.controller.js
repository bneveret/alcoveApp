const Post = require('../models/post.model');

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const post = await Post.create({ title, content });

    res.status(201).json({
      id: post._id,
      anonymousToken: post.anonymousToken
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPosts = async (_req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .select('-anonymousToken');

    res.json(posts);
  } catch {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).select(
      '-anonymousToken'
    );

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch {
    res.status(400).json({ error: 'Invalid post ID' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { token, title, content } = req.body;

    const post = await Post.findOne({
      _id: req.params.id,
      anonymousToken: token
    });

    if (!post) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    if (title) post.title = title;
    if (content) post.content = content;

    await post.save();
    res.json({ message: 'Post updated' });
  } catch {
    res.status(400).json({ error: 'Update failed' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { token } = req.body;

    const result = await Post.deleteOne({
      _id: req.params.id,
      anonymousToken: token
    });

    if (!result.deletedCount) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json({ message: 'Post deleted' });
  } catch {
    res.status(400).json({ error: 'Delete failed' });
  }
};
