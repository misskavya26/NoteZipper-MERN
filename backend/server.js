const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv');
const databaseConnect = require('./Config/databaseConnect');
const UserRouter = require('./Router/UserRouter');
const noteRouter = require('./Router/noteRouter');
const { notFound, ErrorHandler } = require('./errorMiddleware/ErrorMiddleware');
const path = require('path');

const app = express();
dotenv.config();
databaseConnect();
app.use(express.json());


app.use('/api/user', UserRouter);

app.use('/api/notes', noteRouter);

// -------- deployment --------------

__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}
else {
    app.get("/", (req, res) => {
        res.send("API is running...");
    })
}

// -------- deployment --------------

const PORT = process.env.PORT || 5000;

app.use(notFound);
app.use(ErrorHandler);


app.listen(PORT, console.log(`Server started on PORT ${PORT}`));