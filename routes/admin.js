const router = require('express').Router();
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/auth');
const authPost = require('../middlewares/authPost');
const authSuper = require('../middlewares/authSuper');

router.get('/signin', adminController.auth.viewSignin);
router.post('/signin', adminController.auth.actionSignin);
router.use(auth);
router.get('/logout', adminController.auth.actionLogout);
router.get('/dashboard', adminController.dashboard.viewDashboard);

// University endpoint
router.get('/university', adminController.university.viewUniversity);
router.post('/university', authSuper, adminController.university.addUniversity);
router.put('/university/', authPost, adminController.university.editUniversity);
router.delete('/university/:id', authSuper, adminController.university.deleteUniversity);

// Content endpoint
router.get('/content', adminController.content.viewContent);
router.get('/content/:universityId/:id', authPost, adminController.content.viewEditContent);
router.post('/content', authPost, adminController.content.addContent);
router.put('/content/:id', authPost, adminController.content.editContent);
router.delete('/content/:universityId/:id', authPost, adminController.content.deleteContent);

// Schedule endpoint
router.get('/schedule', adminController.schedule.viewSchedule);
router.post('/schedule', authSuper, adminController.schedule.addSchedule);
router.put('/schedule', authPost, adminController.schedule.editSchedule);
router.delete('/schedule/:id', authSuper, adminController.schedule.deleteSchedule);

// User endpoint
router.get('/user', adminController.user.viewUser);
router.put('/user/', authPost, adminController.user.editUserContact);
router.put('/user/:id/:universityId', authSuper, adminController.user.addRemoveUserContact);
router.post('/user', authSuper, adminController.user.addUser);
router.delete('/user/:id', authSuper, adminController.user.deleteUser);

module.exports = router;
