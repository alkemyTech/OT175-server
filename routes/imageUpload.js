const express = require('express');
const router = express.Router();
const isAdminRole = require('../middlewares/adminAuthentication');
const imageUpload = require('../services/imageUpload');

router.post('/', [ isAdminRole ], imageUpload.uploadImage);

module.exports = router