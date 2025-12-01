const express = require('express');
require('dotenv').config();

const bookRouter = require('./src/routes/bookRouter');
const issueBookRouter = require('./src/routes/issueBookRouter');

const app = express();

app.use(express.json());
app.use('/issueBooks', issueBookRouter);
const requestLogger = (request, response, next) => {
    console.log(`${request.method} ${request.path} ${new Date().toISOString()}`);
    next();
};

app.use(requestLogger);
app.use('/books', bookRouter);

app.get('/', (request, response) => {
    response.json('Welcome to Library Management System');
});

app.get('/health', (request, response) => {
    response.status(200).json({
        status: 'Ok',
        message: 'Server is running successfully'
    });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});