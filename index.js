const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/mymoviesDB', {useNewUrlParser: true, useUnifiedTopology: true});

const express = require('express');
const morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid'),
    fs = require('fs'),
    path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

app.use(bodyParser.json());

app.use(morgan('combined', {stream: accessLogStream}));
app.use(express.static('public'));

//READ
/**
 * Sends a welcome message to the client.
 * @function
 * @name welcomeMessage
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object containing a welcome message.
 * @example
 */
app.get('/', (req, res) => {
    res.send('Welcome to my movie club!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root: __dirname});
});
//READ
/**
 * Retrieves data on all the movies.
 * @function
 * @name getMovies
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object containing data on all the movies.
*/
app.get('/movies', (req, res) =>{
    res.json(movies);
});
//GET
app.get('/movies', (req, res) =>{
    res.status(200).json(movies);
});


//READ
/**
 * Retrieves data for a specific movie by title.
 * @function
 * @name getMovieByTitle
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object containing data for the movie with the specified title.
 */

app.get('/movies/:title', (req, res) =>{
    const {title} = req.params;
    const movie = movies.find( movie => movie.Title === title);

    if (movie) {
        res.status(200).json(movie);
    }else{
        res.status(400).send('no such movie')
    }
    
});
//READ
/**
 * Retrieves data for movies based on a specific genre.
 * @function
 * @name getMoviesByGenre
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Parameters passed in the URL.
 * @param {string} req.params.genreName - The name of the genre.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object containing data for movies belonging to the specified genre.
 */
app.get('/movies/genre/:genreName', (req, res) =>{
    const {genreName} = req.params;
    const genre = movies.find( movie => movie.Genre.Name === genreName).Genre;

    if (genre) {
        res.status(200).json(genre);
    }else{
        res.status(400).send('no such genre')
    }
});
//READ

app.get('/movies/director/:directorName', (req, res) =>{
    const {directorName} = req.params;
    const director = movies.find( movie => movie.Director.Name === directorName).Director;

    if (director) {
        res.status(200).json(director);
    }else{
        res.status(400).send('no such director')
    }
});
//READ
/**
 * Retrieves data for all users.
 * @function
 * @name getUsers
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object containing data for all users.
 */
app.get('/users', (req, res) =>{
    res.status(200).json(users);
});

// Get all users
app.get('/users', async (req, res) => {
    await Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });
/**
 * Retrieves data for a specific user by username.
 * @function
 * @name getUserByUsername
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Parameters passed in the URL.
 * @param {string} req.params.username - The username of the user.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object containing data for the user with the specified username.
 */
app.get('/users/:name', (req, res) =>{
    const {name} = req.params;
    const user = users.find( user => user.name === name);

    if (user) {
        res.status(200).json(user);
    }else{
        res.status(400).send('no such movie')
    }
    
});

// Get a user by username
app.get('/users/:Username', async (req, res) => {
    await Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

//CREAT
/**
 * Creates a new user.
 * @function
 * @name createUser
 * @memberof module:Routes
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The data sent in the request body.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object confirming the creation of the new user.
 */
app.post('/users', (req, res) => {
    const newUser = req.body;
    
    if(newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    }else{
        res.status(400).send('users need names')
    }
});

app.post('/users', async (req, res) => {
    await Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + 'already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: req.body.Password,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) =>{res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });


//UPDATE
/**
 * Updates information for a specific user by name.
 * @function
 * @name updateUserByName
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Parameters passed in the URL.
 * @param {string} req.params.name - The name of the user to update.
 * @param {Object} req.body - The data sent in the request body for updating user information.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object confirming the successful update of user information.
 */
app.put('/users/:name', (req, res) => {
    const {name} = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.name === name);

    if(user) {
        user.name = updatedUser.name;
        res.status(200).json(user);

    }else{
        res.status(400).send('no such user')
    }
});

// Update a user's info, by username
app.put('/users/:Username', async (req, res) => {
    await Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }) 
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error:  ' + err);
    })
  
  });
  
//CREAT
/**
 * Adds a movie to the list of watched movies for a specific user by name.
 * @function
 * @name addMovieToUserList
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Parameters passed in the URL.
 * @param {string} req.params.name - The name of the user.
 * @param {string} req.params.movieTitle - The title of the movie to be added.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object confirming the successful addition of the movie to the user's list.
 */
app.post('/users/:name/:movieTitle', (req, res) => {
    const {name, movieTitle} = req.params;
    

    let user = users.find(user => user.name === name);

    if(user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieName} has been added to user ${name}'s array`);;

    }else{
        res.status(400).send('no such user')
    }
});

// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', async (req, res) => {
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
       $push: { FavoriteMovies: req.params.MovieID }
     },
     { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error:  ' + err);
    });
  });

//DELETE
/**
 * Removes a movie from the list of watched movies for a specific user by name.
 * @function
 * @name removeMovieFromUserList
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Parameters passed in the URL.
 * @param {string} req.params.name - The name of the user.
 * @param {string} req.params.movieTitle - The title of the movie to be removed.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object confirming the successful removal of the movie from the user's list.
 */
app.delete('/users/:name/:movieTitle', (req, res) => {
    const {name, movieTitle} = req.params;
    

    let user = users.find(user => user.name === name);

    if(user) {
        user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${name}'s array`);;

    }else{
        res.status(400).send('no such user')
    }
});

//DELETE
/**
 * Deletes a user by name.
 * @function
 * @name deleteUserByName
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Parameters passed in the URL.
 * @param {string} req.params.name - The name of the user to delete.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON object confirming the successful deletion of the user.
 */

app.delete('/users/:name', (req, res) => {
    const {name} = req.params;
    

    let user = users.find(user => user.name === name);

    if(user) {
        users = users.filter(user => user.name != name);
        res.status(200).send(`user ${name} has been deleted`);;

    }else{
        res.status(400).send('no such user')
    }
});

// Delete a user by username
app.delete('/users/:Username', async (req, res) => {
    await Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + ' was not found');
        } else {
          res.status(200).send(req.params.Username + ' was deleted.');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });
//listen for request
app.listen(8080, () =>{
    console.log('Your app is listening on port 8080.');
});