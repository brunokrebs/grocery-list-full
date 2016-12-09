import * as Koa from 'koa';
import * as StaticFiles from 'koa-static';
import * as BodyParser from 'koa-bodyparser';
import * as Router from 'koa-router';

const CLIENT_FILES = './dev/client/';

// FIXME refactor it to something like a Server class
const SERVER = new Koa();
const ROUTER = new Router();

// middlewares
SERVER.use(BodyParser());
SERVER.use(StaticFiles(CLIENT_FILES));
SERVER.use(ROUTER.routes());

// routes
ROUTER.get('/api/authenticate', function *() {
    this.body = {
        username: `Bruno Krebs`
    };
});

SERVER.listen(3000);
