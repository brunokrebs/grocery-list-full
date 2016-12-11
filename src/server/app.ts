import * as Koa from 'koa';
import * as StaticFiles from 'koa-static';
import * as BodyParser from 'koa-bodyparser';
import * as Router from 'koa-router';
import { Error } from '../common/error';

const CLIENT_FILES = './dev/client/';

// FIXME refactor it to something like a Server class
const SERVER = new Koa();
const ROUTER = new Router();

// middlewares
SERVER.use(BodyParser());
SERVER.use(StaticFiles(CLIENT_FILES));
SERVER.use(ROUTER.routes());

// routes
ROUTER.post('/api/authenticate', function *() {
    if (this.request.body.email == 'me@brunokrebs.com') {
        this.body = {
            email: `me@brunokrebs.com`
        };
    } else {
        let error = new Error(401, `Who are you?`);
        this.status = error.statusCode;
        let err = error.toObject();
        console.log(err);
        this.body = err;
    }
});

SERVER.listen(3000);
