import passport from 'koa-passport';

import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as GoogleStrategy } from 'passport-google-auth';

const port = process.env.PORT || 3000;
const rootUrl = `http://localhost:${port}`;

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  done(null, user)
});

passport.use(new FacebookStrategy({
    clientID: 'your-client-id',
    clientSecret: 'your-secret',
    callbackURL: `${rootUrl}/facebook/callback`
  },
  (token, tokenSecret, profile, done) => {
    // retrieve user ...
    done(null, user)
  }
));

passport.use(new TwitterStrategy({
    consumerKey: 'your-consumer-key',
    consumerSecret: 'your-secret',
    callbackURL: `${rootUrl}/twitter/callback`
  },
  (token, tokenSecret, profile, done) => {
    // retrieve user ...
    done(null, user)
  }
));

passport.use(new GoogleStrategy({
    clientId: 'your-client-id',
    clientSecret: 'your-secret',
    callbackURL: `${rootUrl}/google/callback`
  },
  (token, tokenSecret, profile, done) => {
    // retrieve user ...
    done(null, user)
  }
));
