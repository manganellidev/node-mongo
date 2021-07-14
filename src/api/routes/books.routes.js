const express = require('express');

const router = express.Router();

const bookController = require('../book/bookController');

router.get('/book', bookController.find);
router.get('/book/:id', bookController.findById);

module.exports = router;