const router = require('express').Router()
const adminController = require('../controllers/adminController')
const auth = require('../middlewares/auth')

router.get('/signin', adminController.viewSignin)
router.post('/signin', adminController.actionSignin)
router.use(auth);
router.get('/logout', adminController.actionLogout)
router.get('/dashboard', adminController.viewDashboard)

// University endpoint
router.get('/university', adminController.viewUniversity)
router.post('/university', adminController.addUniversity)
router.put('/university/', adminController.editUniversity)
router.delete('/university/:id', adminController.deleteUniversity)

// Content endpoint
router.get('/content', adminController.viewContent)
router.get('/content/:id', adminController.viewEditContent)
router.post('/content', adminController.addContent)
router.put('/content/:id', adminController.editContent)
router.delete('/content/:id', adminController.deleteContent)

module.exports = router