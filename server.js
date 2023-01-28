const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const notes = require('./db/db.json');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
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

    const { title, text } = req.body;

    const newNote = {
        title,
        text,
        id: uuidv4()
    };

    const response = {
        status: 'Success',
        body: newNote
    };

    notes.push(newNote);
    const notesStr = JSON.stringify(notes);
    
    fs.writeFileSync('./db/db.json', notesStr, (err) =>
     err ? console.log(err) : console.log('Note added to database!')
    );

    res.status(201).json(response);
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);