const express=require("express");
const router=express.Router();
const controller=require('../controllers/controller');
const registerationSchema= require('../../schema/validators/registerValidator');
const cycleInfoValidator= require('../../schema/validators/cycleInfoValidator')
const validate = require("../middlewares/validate_middleware")
const authMiddleware = require("../middlewares/auth_middleware")

router.route("/").get(controller.home);

router
.route("/registration")
.post(validate(registerationSchema), controller.registeration);

router.route("/api/loginForm").post(controller.login);

router.route("/contact").post(controller.contact);

router.route("/saveCycleInformation").post((validate(cycleInfoValidator)),controller.cycleInfo);
router.route("/selectCheckInfo").get(controller.selectCheck);
router.route("/userData").get( authMiddleware, controller.user);




module.exports = router;