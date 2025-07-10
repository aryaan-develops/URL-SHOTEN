const express= require('express');
const{ handelGenerateNewShortUrl,handelGetAnalytics}= require("../controller/url")

const router =  express.Router();

router.post('/',handelGenerateNewShortUrl);

router.get('/analytics/:shortId',handelGetAnalytics);


module.exports = router;

