const express = require('express');
const path = require('path');
let db = require('./db/db.json')
const fs = require('fs')
const app = express();

const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// app.get('/', (req, res) =>
//   res.send('Navigate to /index or /notes')
// );

app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, './public/notes.html')));

app.get('/api/notes', (req, res) => {
res.json(db)
})
app.post('/api/notes', (req, res) => {
  let newNote = {
    title: req.body.title,
    text: req.body.text,
    id: Math.random() * 1000
  }
  db.push(newNote)
  fs.writeFileSync('./db/db.json', JSON.stringify(db))
  res.json(db)
})

app.listen(PORT, () =>
console.log(`listening at http://localhost:${PORT}`)
);