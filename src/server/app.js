import serve from 'koa-static';
import koa from 'koa';

const CLIENT_FILES = './dist';

const app = koa();
app.use(serve(CLIENT_FILES));
app.listen(3000);
