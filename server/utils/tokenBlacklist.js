// Simple in-memory blacklist. For production, use Redis or a database.
const blacklistedTokens = new Set();

export const addTokenToBlacklist = (token) => {
  blacklistedTokens.add(token);
};

export const isTokenBlacklisted = (token) => {
  return blacklistedTokens.has(token);
};
