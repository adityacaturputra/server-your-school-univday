const router = require('express').Router()
const adminController = require('../controllers/adminController')
const auth = require('../middlewares/auth')
const authPost = require('../middlewares/authPost')
const authSuper = require('../middlewares/authSuper')

router.get('/signin', adminController.viewSignin)
router.post('/signin', adminController.actionSignin)
router.use(auth);
router.get('/logout', adminController.actionLogout)
router.get('/dashboard', adminController.viewDashboard)

// University endpoint
router.get('/university', adminController.viewUniversity)
router.post('/university', authSuper, adminController.addUniversity)
router.put('/university/', authPost, adminController.editUniversity)
router.delete('/university/:id', authSuper, adminController.deleteUniversity)

// Content endpoint
router.get('/content', adminController.viewContent)
router.get('/content/:universityId/:id', authPost, adminController.viewEditContent)
router.post('/content', authPost, adminController.addContent)
router.put('/content/:id', authPost, adminController.editContent)
router.delete('/content/:universityId/:id', authPost, adminController.deleteContent)

// User endpoint
router.get('/user', adminController.viewUser)
router.post('/user', authSuper, adminController.addUser)
router.delete('/user/:id', authSuper, adminController.deleteUser)

module.exports = router