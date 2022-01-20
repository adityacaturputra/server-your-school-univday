const router = require('express').Router();
const apiController = require('../controllers/apiController');

router.get('/university', apiController.getAllUniversities);
router.get('/university/:id', apiController.getUniversity);
router.get('/schedule', apiController.getAllSchedule);
router.get('/contact', apiController.getAllContactPerson);

module.exports = router;
