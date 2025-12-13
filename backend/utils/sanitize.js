const sanitizeString = (value) => {
  if (typeof value !== 'string') return value;

  return value
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .trim();
};

const sanitizeObject = (obj) => {
  const sanitized = {};
  for (const key in obj) {
    sanitized[key] =
      typeof obj[key] === 'string'
        ? sanitizeString(obj[key])
        : obj[key];
  }
  return sanitized;
};

module.exports = { sanitizeString, sanitizeObject };
