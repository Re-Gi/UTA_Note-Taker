const express = require('express');
const nanoid = require('nanoid');
const path = require('path');
const notes = require('./db/db.json');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.js'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    console.log(`${req.method} request recieved`);
    res.status(200).json(notes);
});

// `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved.

app.post('/api/notes', (req, res) => {
    console.log(`${req.method} note request recieved`);

    // const { title, text } = req.body;

    // const newNote = {
    //     title,
    //     text,
    //     note_id: nanoid()
    // };
    const newNote = req.body.push(`note_id: ${nanoid()}`);

    const response = {
        status: 'Success',
        body: newNote
    };

    console.log(response);

    res.status(200).json(response);
    console.log(res);
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);