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
     err ? console.log(err) : console.log('Note added to database.')
    );

    res.status(201).json(response);
});

// `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

app.delete('/api/notes/:id', (req, res) => {
    console.log(`${req.method} note request recieved for ${req.params.id}`);

    // let notesStr2 = JSON.stringify(notes)

    for(let i = 0; i < notes.length; i++){
        if(req.params.id === notes[i].id){
            notes.splice([i], 1);

            var notesStr2 = JSON.stringify(notes);
            return notesStr2;
        }
    };

    fs.writeFileSync('./db/db.json', notesStr2, (err) =>
     err ? console.log(err) : console.log('Database updated.')
    );

    res.json(notes);
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);