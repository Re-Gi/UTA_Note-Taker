const api = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const notes = require('../db/db.json');
const fs = require('fs');

api.get('/notes', (req, res) => {
    console.log(`${req.method} request recieved`);

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.status(200).send(data);
        }
    });
});

api.post('/notes', (req, res) => {
    console.log(`${req.method} note request recieved`);

    const { title, text } = req.body;

    if (title && text) {

        const newNote = {
            title,
            text,
            id: uuidv4()
        };

        const response = {
            status: 'Success',
            body: newNote
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
            console.error(err);
            } else {
            const notesData = JSON.parse(data);
    
            notesData.push(newNote);
    
            fs.writeFile('./db/db.json', JSON.stringify(notesData, null, 4), (err) =>
            err ? console.log(err) : console.log('New note added.')
            );
            }
        });

        res.status(201).json(response);
    } else {
        res.status(500).json('Error adding note.')
    }
});

api.delete('/notes/:id', (req, res) => {
    console.log(`${req.method} note request recieved for ${req.params.id}`);

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        const notesData = JSON.parse(data);

        for(let note of notesData){
            if (req.params.id === note.id) {

                let index = notesData.indexOf(note);
                notesData.splice(index, 1);

                fs.writeFile('./db/db.json', JSON.stringify(notesData, null, 4), 
                (err) => err ? console.log(err) : console.log('New note added.')
            );
            }
        };
    });

    res.json(notes);
});

module.exports = api;