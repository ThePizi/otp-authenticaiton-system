/**
 * @swagger
 * /api/otp/generate:
 *   post:
 *     summary: Generate OTP for a phone number
 *     tags: [OTP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "09123456789"
 *     responses:
 *       200:
 *         description: OTP generated and logged
 *       400:
 *         description: Phone number missing
 */

/**
 * @swagger
 * /api/otp/verify:
 *   post:
 *     summary: Verify OTP code for login or registration
 *     tags: [OTP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *               - code
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "09123456789"
 *               code:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified, user returned
 *       400:
 *         description: OTP failed (expired, incorrect, etc.)
 */

const { generateOTP, verifyOTP } = require("../utils/otp");

exports.generate = async (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber)
    return res.status(400).json({ error: "Phone number required" });

  const result = await generateOTP(phoneNumber);
  if (!result.ok) return res.status(429).json({ error: result.reason });

  res.json({ message: "OTP sent" });
};

exports.verify = async (req, res) => {
  const { phoneNumber, code } = req.body;
  if (!phoneNumber || !code) {
    return res
      .status(400)
      .json({ error: "Either phone number or code is missing" });
  }

  const result = await verifyOTP(phoneNumber, code);
  if (!result.ok)
    return res.status(400).json({ error: `OTP ${result.reason}` });

  let user = await User.findOne({ phoneNumber });
  if (!user) {
    user = await User.create({ phoneNumber });
    console.log("New user created: ", user);
  } else {
    console.log("Existing user logged in: ", user);
  }

  const payload = { userId: user._id, phoneNumber: user.phoneNumber };
  const accessToken = jwt.generateAccessToken(payload);
  const refreshToken = jwt.generateRefreshToken(payload);

  res.json({
    status: "success",
    message: "OTP verified",
    user: { _id: user._id, phoneNumber: user.phoneNumber },
    accessToken,
    refreshToken,
  });
};
