const router = require("express").Router();
const controller = require("../controllers/otp");

router.post("/generate", controller.generate);
router.post("/verify", controller.verify);

module.exports = router;
