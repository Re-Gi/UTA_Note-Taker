const express = require('express');
const path = require('path');
const notes = require('./db/db.json');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.js'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    console.log(`${req.method} request recieved`);
    res.status(200).json(notes);
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);