import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import passportJWT from 'passport-jwt';
import { User } from './models.js';
//const passport = require('passport'),
  //LocalStrategy = require('passport-local').Strategy,
  //Models = require('./models.js'),
  //passportJWT = require('passport-jwt');
  const { Strategy: JWTStrategy, ExtractJwt } = passportJWT;
//let Users = Models.User,
  //JWTStrategy = passportJWT.Strategy,
  //ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'Username',
      passwordField: 'Password',
    },
    async (username, password, callback) => {
      console.log(`${username} ${password}`);
      try { 
      const user = await Users.findOne({ Username: username });
      
        if (!user) {
          console.log('incorrect username');
          return callback(null, false, {
            message: 'Incorrect username or password.',
          });
        
        }
        if (!user.validatePassword(password)) {
          console.log('incorrect password');
          return callback(null, false, { message: 'Incorrect password.' });
        }
        console.log('finished');
        return callback(null, user);
      } catch(error)  {
        
          console.log(error);
          return callback(error);
        }
      }
    )
    
  
);


passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
}, async (jwtPayload, callback) => {
try { 
  const user = await Users.findById(jwtPayload._id);
    //.then((user) => {
      return callback(null, user);
    }
    catch(error)  {
      console.error(error);
      return callback(error)
    }
}));
export default passport;