import passport from 'koa-passport';

process.env.INSTAGRAM_CLIENT_ID;
process.env.INSTAGRAM_CLIENT_SECRET;

import { Strategy as Instagram } from 'passport-instagram';
import { Strategy as Facebook } from 'passport-facebook';
import { Strategy as Twittter } from 'passport-twitter';
import { Strategy as Google } from 'passport-google-auth';

const PORT = process.env.PORT || 3000;
const ROOT_URL = `http://localhost:${PORT}`;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Instagram profile is
//   serialized and deserialized.

// passport.serializeUser((user, done) => done(null, user.id));
// passport.deserializeUser((id, done) => done(null, user));

// Use the instagram strategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Instagram
//   profile), and invoke a callback with a user object.
passport.use(new Instagram({
    clientID: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    callbackURL: `${ROOT_URL}/auth/instagram/callback`
  },
  (accessToken, refreshToken, profile, done) => {
    // asynchronous verification, for effect...
    
    console.log('accessToken: ', accessToken);
    console.log('refreshToken: ', refreshToken);

    console.log(profile);

    // To keep the example simple, the user's Instagram profile is returned to
    // represent the logged-in user.  In a typical application, you would want
    // to associate the Instagram account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
  }
));


passport.use(new Facebook({
    clientID: 'your-client-id',
    clientSecret: 'your-secret',
    callbackURL: `${ROOT_URL}/auth/facebook/callback`
  },
  (token, tokenSecret, profile, done) => {
    // retrieve user ...
    done(null, user)
  }
));

passport.use(new Twittter({
    consumerKey: 'your-consumer-key',
    consumerSecret: 'your-secret',
    callbackURL: `${ROOT_URL}/twitter/callback`
  },
  (token, tokenSecret, profile, done) => {
    // retrieve user ...
    done(null, user)
  }
));

passport.use(new Google({
    clientId: 'your-client-id',
    clientSecret: 'your-secret',
    callbackURL: `${ROOT_URL}/google/callback`
  },
  (token, tokenSecret, profile, done) => {
    // retrieve user ...
    done(null, user)
  }
));
