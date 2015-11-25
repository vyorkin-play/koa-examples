import debug from 'debug';

import koa from 'koa';
import route from 'koa-route';
import logger from 'koa-logger';
import hbs from 'koa-hbs';
import mount from 'koa-mount';
import helmet from 'koa-helmet';
import favicon from 'koa-favicon';
import staticCache from 'koa-static-cache';
import responseTime from 'koa-response-time';

let app = koa();

app.use(logger());
app.use(responseTime());
app.use(helmet());

app.use(route.get('/', index));
app.use(route.get('/about', about));

app.listen(8008);

console.log('listening on port 8008...');

function* index() {
  this.body = '<h1>index</h1>';
}

function* about() {
  this.body = '<h1>about</h1>';
}
