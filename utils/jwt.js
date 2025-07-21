const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const accessTokenExpiry = "10s";
const refreshTokens = [];

const generateAccessToken = (user) => {
  return jwt.sign(user, accessTokenSecret, {
    expiresIn: "24h",
  });
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(user, refreshTokenSecret, {
    expiresIn: "14d",
  });
  refreshTokens.push(refreshToken);
  return refreshToken;
};

const verifyAccessToken = async (token) => {
  try {
    const decoded = await jwt.verify(token, accessTokenSecret);
    return decoded;
  } catch (err) {
    throw new Error("Token verification failed");
  }
};
const verifyRefreshToken = (token) => {
  return jwt.verify(token, refreshTokenSecret);
};

const invalidateRefreshToken = (token) => {
  const index = refreshTokens.indexOf(token);
  if (index > -1) {
    refreshTokens.splice(index, 1);
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  invalidateRefreshToken,
};
