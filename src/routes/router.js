const express=require("express");
const router=express.Router();
const controller=require('../controllers/controller');
const registerationSchema= require('../../schema/validators/validator');
const validate = require("../middlewares/validate_middleware")

router.route("/").get(controller.home);

router
.route("/registration")
.post(validate(registerationSchema), controller.registeration);

router.route("/api/loginForm").post(controller.login);

router.route("/contact").post(controller.contact);




module.exports = router;