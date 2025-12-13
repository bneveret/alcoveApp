const rateMap = new Map();

const rateLimit = (options = {}) => {
  const {
    windowMs = 60_000,
    max = 10
  } = options;

  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();

    if (!rateMap.has(key)) {
      rateMap.set(key, []);
    }

    const timestamps = rateMap.get(key).filter(
      (t) => now - t < windowMs
    );

    timestamps.push(now);
    rateMap.set(key, timestamps);

    if (timestamps.length > max) {
      return res.status(429).json({
        error: 'Too many requests. Please slow down.'
      });
    }

    next();
  };
};

module.exports = rateLimit;
