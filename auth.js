// require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');
const cookieparser = require('cookie-parser');
const User = require('./models/user');

// Accepting the express `app` instance as an arg
// that way, we don't declare it here.

const setupAuth = (app) => {
    app.use(cookieparser());
    app.use(session({
        secret: 'c4EKJk8DKpsHDMuBkRnH',
        resave: true,
        saveUninitialized: true
    }));

    passport.use(new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows the passing back of the entire request to the callback
        }, (req, username, password, done) => {
          User.findOne({ 
                where: {
                    username: username 
                }
            }).then(user => {
                console.log('found user!!!!')
                return done(null, user);
            }).catch(err => {
                console.log('error!!!!');
                done(err);
            })
        }
    ));
                
    

    passport.use(new FacebookStrategy({
        clientID: process.env.FB_CLIENT_ID,
        clientSecret: process.env.FB_CLIENT_SECRET,
        callbackURL: "https://groupstrengthsf.com:3000/facebook/auth"
    }, (accessToken, refreshToken, profile, done) => {
        User.findOrCreate({
            where: {
                fbId: profile.id
            },
            defaults: {
                // email: profile.emails[0].value
                displayName: profile.displayName
            }
        }).spread(user => {
            console.log(profile);
            done(null, user);
        })
        .catch(err => done(err, false))   
    }));

    passport.serializeUser(function (user, done) {
        console.log('serializing user session');
        console.log(user);
        done(null, user.id);
    });

    // passport.deserializeUser(function (id, done) {
    //     console.log('deserializing user session');
    //     console.log(id);
    //     done(null, id);
    // });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id).then(user =>{
            done(null, user);
        }).catch(err => {
            done(err);
        });
    });

    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/login/facebook', passport.authenticate('facebook'));
    app.get('/logout', function(req, res, next) {
        console.log('logging out');
        req.logout();
        req.session.destroy();
        res.redirect('/');
    });

    app.get('/facebook/auth',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        (req, res) => {
            // if you don't have your own route handler after the passport.authenticate middleware
            // then you get stuck in the infinite loop

            console.log('logged in from Facebook authentication');
            console.log(req.isAuthenticated());
            res.redirect('/results/' + req.user.id);
        }
    );

    app.post('/login',
        passport.authenticate('local', { 
            successRedirect: '/',
            failureRedirect: '/temp'
        }), (req, res) => {
            console.log(req.isAuthenticated());
            console.log(req);
        }
    );
}

const ensureAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    } else {
        console.log('not authenticated');
        res.redirect('/login');
    }
}

// The default export is the `setupAuth` function.
// That will be used like so:
// const setupAuth = require('./auth');
// setupAuth(app);
module.exports = setupAuth;

// Secondarily, the route handler is exported that checks
// for a logged-in user.
// That gets pulled in like so:
// const ensureAuthenticated = require('../auth').ensureAuthenticated;
module.exports.ensureAuthenticated = ensureAuthenticated;


