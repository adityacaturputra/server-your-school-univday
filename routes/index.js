/* eslint-disable no-unused-vars */
const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.redirect('admin/signin');
});

module.exports = router;
