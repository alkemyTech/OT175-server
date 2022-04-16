var express = require('express');
var router = express.Router();
const {
    createNewActivity,
    updateActivity 
} = require('../controllers/controllerActivities')

router.post ('/', createNewActivity);
router.put ('/', updateActivity);

module.exports = router;