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


let users = [
    {
        id: 1,
        name: 'John',
        favoriteMovies: []
    },
    {
        id: 2,
        name: 'Max',
        favoriteMovies: ['Focus']
    },


]

let movies = [
    {
        'Title': 'Pay it Forward',
        'Description': 'Trevor McKinney begins the seventh grade in Las Vegas. His social studies teacher, Eugene Simonet, assigns the class to put into action a plan that will change the world for the better. Trevor calls his plan pay it forward, which means the recipient of a favor does a favor for three others rather than paying it back.',
        'Genre': {  
            'Name': 'romantic drama',
            'Description': 'Romantic dramas are a more complex subgenre. Romantic dramas dive deeper into the conflicting emotions of romance and relationships, dealing with other issues like tribulations, death, separation, infidelity, and the introduction of love triangles.'
        },
        'Director':{
            'Name':'Mimi Leder',
            'Bio': 'Miriam Leder born January 26, 1952) is an American film and television director and producer; she is noted for her action films and use of special effects. She is known for directing the films The Peacemaker (1997), Deep Impact (1998), Pay It Forward (2000), and On the Basis of Sex (2018). She was the first female graduate of the AFI Conservatory, in 1973. She has been nominated for ten Emmy Awards, winning two.',
            'Birth': 1952.
        } 
    },

    {
        'Title': 'Freedom Writers',
        'Description': 'A dedicated teacher (Hilary Swank) in a racially divided Los Angeles school has a class of at-risk teenagers deemed incapable of learning. Instead of giving up, she inspires her students to take an interest in their education and planning their future.',
        'Genre': {
            'Name': 'Drama',
            'Description': 'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
        },
        'Director': {
            'Name': 'Richard LaGravenese',
            'Bio': 'Richard LaGravenese born October 30, 1959) is an American screenwriter and film director, known for The Fisher King, The Bridges of Madison County, and Behind the Candelabra.',
            'Birth': 1959.
        } 
    },
    {
        'Title': 'Pursuit of Happyness',
        'Description': 'Will Smith stars in this moving tale inspired by the true story of Chris Gardner, a San Francisco salesman struggling to build a future for himself and his 5-year-old son Christopher (Jaden Smith).',
        'Genre': {
            'Name': 'biographical drama',
            'Description':'A film that tells the story of the life of a real person, often a well-known monarch, political leader, or artist.'
        },
        'Director': { 
        'Name': 'Gabriele Muccino',
        'Bio': 'Gabriele Muccino; born 20 May 1967) is an Italian film director. He has worked his way from making short films only aired on Italian television to become a well-known and successful American filmmaker. He is the elder brother of actor Silvio Muccino, who often appears in his brother films. Muccino has directed 12 films and is best known for his first American film The Pursuit of Happyness, starring Will Smith. Muccino has been nominated for and won several awards including the David di Donatello Award for Best Director in 2001 for his film The Last Kiss.',
        'Birth': 1967
        }
    },
    {
        'Title': 'Roman J.Israel, Esq',
        'Description': 'Denzel Washington stars in the Dan Gilroy character drama Roman J. Israel, Esq. The film follows a civil rights attorney who gets a rude awakening when his law partner dies and he is forced to take a job with a large corporate firm and finds himself making compromises.',
        'Genre': {
            'Name': 'Drama',
            'Description': 'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
        },
        'Director': {  
            'Name': 'Dan Gilroy',
            'Bio': 'Daniel Christopher Gilroy (born June 24, 1959) is an American screenwriter and film director. He is best known for writing and directing Nightcrawler (2014), for which he won Best Screenplay at the 30th Independent Spirit Awards, and was nominated for Best Original Screenplay at the 87th Academy Awards. His other screenwriting credits include Freejack (1992), Two for the Money (2005), The Fall (2006), Real Steel (2011), and The Bourne Legacy (2012)—the last in collaboration with his brother Tony Gilroy. His wife, Rene Russo, has also been his frequent collaborator since the two met in 1992 and married later that year.',
            'Birth': 1959
        }
    },
    {
        'Title': 'Catch Me If You Can',
        'Description': 'Catch Me If You Can is a 2002 American biographical crime comedy-drama[3] film directed and produced by Steven Spielberg and starring Leonardo DiCaprio and Tom Hanks with Christopher Walken, Martin Sheen, Nathalie Baye, Amy Adams, and James Brolin in supporting roles. The screenplay by Jeff Nathanson is based on the semi-autobiographical book of the same name by Frank Abagnale Jr., who claims that prior to his 19th birthday, he successfully performed cons worth millions of dollars by posing as a Pan American World Airways pilot, a Georgia doctor, and a Louisiana parish prosecutor. The truth of his story is heavily disputed.',
        'Genre': {
            'Name': 'biographical crime comedy-drama',
            'Description': 'A biographical film or biopic is a film that dramatizes the life of a non-fictional or historically-based person or people. Such films show the life of a historical person and the central characters real name is used. They differ from docudrama films and historical drama films in that they attempt to comprehensively tell a single person life story or at least the most historically important years of their lives.'
        },
        'Director': { 
            'Name': 'Steven Spielberg',
            'Bio': 'Steven Allan Spielberg; born December 18, 1946) is an American film director, producer and screenwriter. A major figure of the New Hollywood era and pioneer of the modern blockbuster, he is the most commercially successful director in history. He is the recipient of many accolades, including three Academy Awards, two BAFTA Awards, and four Directors Guild of America Awards, as well as the AFI Life Achievement Award in 1995, the Kennedy Center Honor in 2006, the Cecil B. DeMille Award in 2009 and the Presidential Medal of Freedom in 2015. Seven of his films have been inducted into the National Film Registry by the Library of Congress as "culturally, historically or aesthetically significant".',
            'Birth': 1964
        }
    },
    {
        'Title': 'Fences',
        'Description': 'The film takes place in 1950s Pittsburgh at Troy Maxson house that he lives in with his wife Rose and their son Cory. Troy works as a garbage collector alongside his best friend, Jim Bono, who he has known for decades. Troy left home at 14 after beating up his abusive father, and became a robber to sustain himself.',
        'Genre': {
            'Name': 'Drama',
            'Descrription': 'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
        },
        'Director': { 
        'Name': 'Denzel Washington',
        'Bio': 'Denzel Hayes Washington Jr. (born December 28, 1954) is an American actor, producer, and director. In a career spanning over four decades, Washington has received numerous accolades, including a Tony Award, two Academy Awards, three Golden Globe Awards and two Silver Bears. He was honored with the Cecil B. DeMille Lifetime Achievement Award in 2016, the AFI Life Achievement Award in 2019, and in 2020 The New York Times named him the greatest actor of the 21st century. In 2022, Washington received the Presidential Medal of Freedom.',
        'Birth': 1954
        }
    },
    {
        'Title': 'The Wolf of Wall Street',
        'Description': 'The Wolf of Wall Street is a 2013 American epic biographical black comedy crime film co-produced and directed by Martin Scorsese and written by Terence Winter, based on Jordan Belfort 2007 memoir of the same name. It recounts Belfort career as a stockbroker in New York City and how his firm, Stratton Oakmont, engaged in rampant corruption and fraud on Wall Street, leading to his downfall. The film stars Leonardo DiCaprio as Belfort, Jonah Hill as his business partner and friend, Donnie Azoff, Margot Robbie as his second wife, Naomi Lapaglia, Matthew McConaughey as his mentor and former boss Mark Hanna, and Kyle Chandler as FBI agent Patrick Denham. It is DiCaprio fifth collaboration with Martin Scorsese.',
        'Genre': {
            'Name': 'biographical crime comedy-drama',
            'Description': 'A biographical film or biopic is a film that dramatizes the life of a non-fictional or historically-based person or people. Such films show the life of a historical person and the central characters real name is used. They differ from docudrama films and historical drama films in that they attempt to comprehensively tell a single person life story or at least the most historically important years of their lives.'
        },

        'Director': {
            'Name': 'Martin Scorsese',
            'Bio': 'Martin Charles Scorsese Italian ; born November 17, 1942) is an American filmmaker. He emerged as one of the major figures of the New Hollywood era. Scorsese has received many accolades, including an Academy Award, four BAFTA Awards, three Emmy Awards, a Grammy Award, three Golden Globe Awards, and two Directors Guild of America Awards. He has been honored with the AFI Life Achievement Award in 1997, the Film Society of Lincoln Center tribute in 1998, the Kennedy Center Honor in 2007, the Cecil B. DeMille Award in 2010, and the BAFTA Fellowship in 2012. Five of his films have been inducted into the National Film Registry by the Library of Congress as "culturally, historically or aesthetically significant".',
            'Birth': 1942
        } 
    },
    {
        'Title': 'Now You See Me',
        'Description': 'Now You See Me is a 2013 American heist film[4] directed by Louis Leterrier from a screenplay by Ed Solomon, Boaz Yakin, and Edward Ricourt and a story by Yakin and Ricourt. It is the first installment in the Now You See Me series. The film features an ensemble cast of Jesse Eisenberg, Mark Ruffalo, Woody Harrelson, Mélanie Laurent, Isla Fisher, Common, Dave Franco, Michael Caine, and Morgan Freeman. The plot follows an FBI agent and an Interpol detective who track and attempt to bring to justice a team of magicians who pull off bank heists and robberies during their performances and reward their audiences with the money.',
        'Genre': {
            'Name': 'Thriller',
            'Description': 'Thriller is a genre of fiction with numerous, often overlapping, subgenres, including crime, horror, and detective fiction. Thrillers are characterized and defined by the moods they elicit, giving their audiences heightened feelings of suspense, excitement, surprise, anticipation and anxiety. This genre is well suited to film and television.',
        },
        'Director': {
            'Name': 'Louis Leterrier',
            'Bio': 'Louis Leterrier; born 17 June 1973) is a French film and television director. Best known for his work in action films, he directed the first two Transporter films (2002 until 2015), The Incredible Hulk (2008), Clash of the Titans (2010), Now You See Me (2013), and the tenth Fast & Furious installment, Fast X (2023). He also directed the streaming television series The Dark Crystal: Age of Resistance (2019).',
            'Birth': 1973
        }, 
    },         

    {
        'Title': 'Focus',
        'Description': 'Focus is a 2015 American crime comedy-drama film written and directed by Glenn Ficarra and John Requa, starring Will Smith and Margot Robbie. The plot follows a career con artist who takes an aspiring femme fatale under his wing.',
        'Genre': {
            'Name': 'comedy drama crime ',
            'Description': 'Crime comedy films are a hybrid of the crime film and the comedy that play with the conventions of the crime film and may introduce aspects of dark humor.'
        },
        'Director': {
            'Name': 'Glenn Ficarra and John Requa',
            'Bio': 'Glenn Ficarra (born May 27, 1969) is an American screenwriter, director, and producer. He has frequently collaborated with John Requa.',
            'Birth': 1969
         },
    },     
    {
        'Title': 'Zodiac',
        'Description': 'The film tells the story of the manhunt for the Zodiac Killer, a serial murderer who terrorized the San Francisco Bay Area during the late 1960s and early 1970s, taunting police with letters, bloodstained clothing, and ciphers mailed to newspapers. The case remains one of the United States most infamous unsolved crimes. Fincher, Vanderbilt, and producer Bradley J Fischer spent 18 months conducting their own investigation and research into the Zodiac murders. Fincher employed the digital Thomson Viper FilmStream Camera to photograph most of the film, and used traditional high speed film cameras for slow-motion murder sequences.',
        'Genre': {
            'Name': ' neo-noir crime thriller',
            'Description': 'Neo noir features characters who commit violent crimes, but without the motivations and narrative patterns found in film noir. Neo noir assumed global character.'
        },

        'Director': {
            'Name': 'David Fincher',
            'Bio': 'David Andrew Leo Fincher (born August 28, 1962) is an American film director. His films, most of which are psychological thrillers, have collectively grossed over $2.1 billion worldwide and have received numerous accolades, including three Academy Awards for Best Director nominations for him. He has also received four Primetime Emmy Awards, two Grammy Awards, a BAFTA Award, and a Golden Globe Award.',
            'Birth': 1962
        } 
    }
];

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