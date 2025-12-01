const IssueBookModel = require('../model/issueBookModel');
const Book = require('../model/bookModel'); 
const User = require('../model/userModel'); 
const IssueBook = async (request, response) => {
    try {
        const { bookId, bookName, studentId, studentName, issueDate, returnDate } = request.body;

        const book = await Book.findById(bookId);
        if (!book) {
            return response.status(404).json({ message: "Book not found" });
        }

        const student = await User.findById(studentId);
        if (!student) {
            return response.status(404).json({ message: "Student not found" });
        }

        if (book.quantity <= 0) {
            return response.status(400).json({ message: "Book not available" });
        }

        const newIssue = new IssueBookModel({
            bookId,
            bookName,
            studentId,
            studentName,
            issueDate,
            returnDate
        });

        await newIssue.save();

        book.quantity -= 1;
        await book.save();

        return response.status(201).json({ 
            message: "Book issued successfully", 
            issue: newIssue 
        });
    } catch (error) {
        console.error("IssueBook error:", error);
        return response.status(500).json({ message: "Server error", error: error.message });
    }
};
module.exports = { IssueBook };