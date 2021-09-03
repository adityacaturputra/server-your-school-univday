const router = require('express').Router()
const apiController = require('../controllers/apiController')

router.get('/all', apiController.getAllUniversities)

module.exports = router