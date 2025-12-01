const express = require('express');
const { IssueBook } = require('../controller/issueBookController');

const router = express.Router();

router.post('/issue', IssueBook);
router.put('/:id',returnBook);

module.exports = router;