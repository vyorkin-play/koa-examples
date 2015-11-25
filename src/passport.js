import debug from 'debug';
import fs from 'fs';

import Koa from 'koa';

import route from 'koa-route';
import logger from 'koa-logger';
import convert from 'koa-convert';
import session from 'koa-generic-session';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';

import './auth.js';

let app = new Koa();
app.proxy = true;
app.keys = ['the-fucking-session-secret'];

// middleware
app.use(convert(session()));
app.use(bodyParser());
app.use(logger());

app.use(passport.initialize());
app.use(passport.session());

// routing
app.use(route.get('/', (ctx) => {
  ctx.type = 'html'
  ctx.body = fs.createReadStream('src/views/passport/login.html');
}));

app.use(route.get('/app', (ctx) => {
  ctx.type = 'html'
  ctx.body = fs.createReadStream('src/views/passport/index.html');
}));

app.use(route.get('/logout', (ctx) => {
  ctx.logout();
  ctx.redirect('/');
}));

app.use(route.get('/auth/facebook', passport.authenticate('facebook')));
app.use(route.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/app',
  failureRedirect: '/'
})));

app.use(route.get('/auth/twitter', passport.authenticate('twitter')));
app.use(route.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/app',
  failureRedirect: '/'
})));

app.use(route.get('/auth/google', passport.authenticate('google')));
app.use(route.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/app',
  failureRedirect: '/'
})));

app.use(route.get('/auth/instagram', passport.authenticate('instagram', {
  scope: ['public_content']
})));
app.use(route.get('/auth/instagram/callback', passport.authenticate('instagram', {
  successRedirect: '/app',
  failureRedirect: '/'
})));

app.use(route.get('/auth/vk', passport.authenticate('vk')));
app.use(route.get('/auth/vk/callback', passport.authenticate('vk', {
  successRedirect: '/app',
  failureRedirect: '/'
})));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
