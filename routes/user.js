const express = require("express");
const {handelUserSignup , handelUserlogin}= require('../controller/user')
const router =express.Router();
router.post('/',handelUserSignup)
router.post('/login',handelUserlogin)


module.exports=router;