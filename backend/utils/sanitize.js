exports.sanitizeObject = (obj) => {
  const sanitized = {};
  if (obj.title) sanitized.title = String(obj.title).trim();
  if (obj.content) sanitized.content = String(obj.content).trim();
  if (Array.isArray(obj.tags)) sanitized.tags = obj.tags.map(String).filter(tag => tag); // remove null/undefined
  return sanitized;
};
