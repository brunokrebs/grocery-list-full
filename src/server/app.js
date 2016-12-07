var serve = require('koa-static');
var koa = require('koa');
var app = koa();

app.use(serve(__dirname + '/../client'));

app.listen(3000);
