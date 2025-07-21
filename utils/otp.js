const redis = require("./redis");
const crypto = require("crypto");

const OTP_EXPIRY = 300; // 5 minutes
const COOLDOWN_SECONDS = 90; // 1:30 minute cooldown

async function generateOTP(phoneNumber) {
  const cooldownKey = `otp_cooldown:${phoneNumber}`;
  const otpKey = `otp_code:${phoneNumber}`;

  const isCoolingDown = await redis.get(cooldownKey);
  if (isCoolingDown) {
    const ttl = await redis.ttl(cooldownKey);
    return {
      ok: false,
      reason: `Please wait ${ttl}s before requesting another OTP.`,
    };
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  await redis.set(otpKey, otp, "EX", OTP_EXPIRY);
  await redis.set(cooldownKey, "1", "EX", COOLDOWN_SECONDS);

  console.log(`[OTP] Sent ${otp} to ${phoneNumber}`);
  return { ok: true };
}

async function verifyOTP(phoneNumber, code) {
  const otpKey = `otp_code:${phoneNumber}`;
  const savedCode = await redis.get(otpKey);

  if (!savedCode) return { ok: false, reason: "OTP expired or not found" };
  if (savedCode !== code) return { ok: false, reason: "OTP incorrect" };

  await redis.del(otpKey);
  return { ok: true };
}

module.exports = {
  generateOTP,
  verifyOTP,
};
