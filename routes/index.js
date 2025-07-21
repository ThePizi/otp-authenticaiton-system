const router = require("express").Router();
const userRouter = require("./users");
const otpRouter = require("./otp");

router.use("/users", userRouter);
router.use("/otp", otpRouter);

module.exports = router;
