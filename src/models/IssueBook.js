const mongoose = require('express');

const issueBookSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    issueDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    returnDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['issued', 'returned', 'overdue'],
        default: 'issued',
        required: true
    }
});

const IssueBook = mongoose.model('IssueBook', issueBookSchema);

module.exports = IssueBook;
