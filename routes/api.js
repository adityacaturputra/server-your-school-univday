const router = require('express').Router();
const apiController = require('../controllers/apiController');

router.get('/university', apiController.getAllUniversities);
router.get('/schedule', apiController.getAllSchedule);

module.exports = router;
