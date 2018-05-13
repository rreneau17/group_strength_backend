// require('dotenv').config();
const passport = require('passport');
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

    passport.use(new FacebookStrategy({
        clientID: process.env.FB_CLIENT_ID,
        clientSecret: process.env.FB_CLIENT_SECRET,
        callbackURL: "https://groupstrengthsf.com:3000/facebook/auth"
    }, (accessToken, refreshToken, profile, done) => {
        User.findOrCreate({
            where: {
                fbId: profile.id
            }
            // defaults: {
            //     email: profile.emails[0].value,
            //     firstName: profile.name.givenName
            // }
        }).then(result => {
            // `findOrCreate` returns an array
            // The actual user instance is the 0th element in the array
            let user = result[0];
            return done(null, user);
        }).catch (err => {
            console.log('Error logging in.');
            done(err, null);
        })   
    }));

    passport.serializeUser(function (user, done) {
        console.log('serializing user session');
        console.log(user);
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        console.log('deserializing user session');
        console.log(id);
        done(null, id);
    })

    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/login/facebook', passport.authenticate('facebook'));
    app.get('/logout', function(req, res, next) {
        console.log('logging out');
        req.logout();
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


