import serve from 'koa-static';
import koa from 'koa';

const CLIENT_FILES = __dirname + '/../client';

const app = koa();
app.use(serve(CLIENT_FILES));
app.listen(3000);
