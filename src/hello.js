import Koa from 'koa';
import { get, post } from 'koa-route';

let app = new Koa();

app.use(get('/', (ctx) => {
  ctx.body = '<h1>index</h1>';
}));

app.use(get('/about', (ctx) => {
  ctx.body = '<h1>about</h1>';
}));

app.listen(8008);

console.log('listening on port 8008...');
