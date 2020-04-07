const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

const fileRoutes = require('./routes/file');

app.use('/file', fileRoutes);

// Error handler
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    const errorStatusCode = error.statusCode || 500;
    console.log(`Error: ${error.message}`);
    res.status(errorStatusCode).send({ message: error.message });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
