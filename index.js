const express = require('express');
const morgan = require('morgan'),
    fs = require('fs'),
    path = require('path');
const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

let movies = [
    {
        title: 'Pay it Forward',
        director: 'Mimi Leder'
    },
    {
        title: 'Freedom Writers',
        director: 'Richard LaGravenese'
    },
    {
        title: 'Pursuit of Happyness',
        director: 'Gabriele Muccino'
    },
    {
        title: 'Roman J.Israel, Esq',
        director: 'Dan Gilroy'
    },
    {
        title: 'Catch Me If You Can',
        director: 'Steven Spielberg'
    },
    {
        title: 'Fences',
        director: 'Denzel Washington'
    },
    {
        title: 'The Wolf of Wall Street',
        director: 'Martin Scorsese'
    },
    {
        title: 'Now You See Me',
        director: 'Louis Leterrier'
    },
    {
        title: 'Focus',
        director: 'Glenn Ficarra and John Requa'
    },
    {
        title: 'Zodiac',
        director: 'David Fincher'
    }
];

app.use(morgan('combined', {stream: accessLogStream}));
app.use(express.static('public'));

//GET request
app.get('/', (req, res) => {
    res.send('Welcome to my movie club!');
});
app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root: __dirname});
});
app.get('/movies', (req, res) =>{
    res.json(movies);
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('something Wrong!');
});
//listen for request
app.listen(8080, () =>{
    console.log('Your app is listening on port 8080.');
});