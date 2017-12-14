import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

/* eslint-disable no-console */

console.log("starting distServer")
const port = 3000;
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/users', (req, res) => {
    // Hard coded database call
    res.json([
        {"id": 1, "firstName": "Bob", "lastName": "Smith", "email": "bot@gmail.com"},
        {"id": 2, "firstName": "Tammy", "lastName": "Norton", "email": "tnorton@gmail.com"},
        {"id": 3, "firstName": "Tina", "lastName": "Lee", "email": "lee.tina@gmail.com"},
    ]);
});

app.listen(port, err => {
    if (err) {
        console.log(err);
    } else {
        open('http://localhost:' + port);
    }
});