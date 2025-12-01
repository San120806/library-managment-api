const Books = [];

const getAllBooks = (request, response) => {
    try {
        response.status(200).json(Books);
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
};

const getBookById = (request, response) => {
    try {
        const book = Books.findByIDAndUpdate((book) => book.id === parse.Id,request.body,{new:true});
        if (!book) {
            return response.status(404).json({ message: "book not found" });
        }
        response.status(200).json({message:"book found successfully"});
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
};

const createBook = (request, response) => {
    try {
        const { title, author, publishedYear, price, quantity } = request.body;

        if (!title || !author || !publishedYear || !price || !quantity) {
            return response.status(400).json({ message: "please provide all details" });
        }

        const newBook = {
            id: Books.length + 1,    // fixed spelling (lenght → length)
            title,
            author,
            publishedYear,
            price,
            quantity,
            status: 'available'
        };

        Books.push(newBook);
        response.status(201).json(newBook);

    } catch (error) {
        response.status(500).send({ message: error.message });
    }
};

const updateBook = (request, response) => {
    try {
        const book = Books.find((book) => book.id === parseInt(request.params.id));

        if (!book) {
            return response.status(404).json({ message: "book not found" });
        }

        const { title, author, publishedYear, price, quantity } = request.body;

        if (!title || !author || !publishedYear || !price || !quantity) {
            return response.status(400).json({ message: 'Please provide all details' });
        }

        book.title = title;
        book.author = author;
        book.publishedYear = publishedYear;
        book.price = price;
        book.quantity = quantity;

        response.status(200).json({ message: "book updated successfully", data: book });

    } catch (error) {
        response.status(500).send({ message: error.message });
    }
};

const deleteBook = (request, response) => {
    try {
        const bookIndex = Books.findIndex((book) => book.id === parseInt(request.params.id));

        if (bookIndex === -1) {
            return response.status(404).json({ message: "book not found" });
        }

        Books.splice(bookIndex, 1);
        response.status(200).json({ message: "book deleted successfully" });

    } catch (error) {
        response.status(500).send({ message: error.message });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};