const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv');
const databaseConnect = require('./Config/databaseConnect');
const UserRouter = require('./Router/UserRouter');
const noteRouter=require('./Router/noteRouter');
const { notFound, ErrorHandler } = require('./errorMiddleware/ErrorMiddleware');

const app = express();
dotenv.config();
databaseConnect();
app.use(express.json());


app.get("/", (req, res) => {
    res.send("API is running...");
})

// app.get("/api/notes", (req, res) => {
//     res.json(notes);
// })

app.use('/api/user', UserRouter);

app.use('/api/notes', noteRouter);

const PORT = process.env.PORT || 5000;

app.use(notFound);
app.use(ErrorHandler);


app.listen(PORT, console.log(`Server started on PORT ${PORT}`));