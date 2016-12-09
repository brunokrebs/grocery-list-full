import * as Koa from 'koa';
import * as StaticFiles from 'koa-static';
import * as BodyParser from 'koa-bodyparser';

const CLIENT_FILES = './dev/client/';

const app = new Koa();
app.use(BodyParser());
app.use(StaticFiles(CLIENT_FILES));
app.listen(3000);
