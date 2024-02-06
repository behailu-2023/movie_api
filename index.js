const express = require('express');
const app = express();

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
//listen for request
app.listen(8080, () =>{
    console.log('Your app is listening on port 8080.');
});