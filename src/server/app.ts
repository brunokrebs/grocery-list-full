import * as Koa from 'koa';
import * as StaticFiles from 'koa-static';
import * as BodyParser from 'koa-bodyparser';
import * as Lokijs from 'lokijs';
import * as Router from 'koa-router';
import { Error } from '../common/error';
import { SINGLETON as UserDAO } from './user/user.dao';

const CLIENT_FILES = './dev/client/';

const DB = new Lokijs('klan-database.json', {
    autosave: true
});

UserDAO.configure(DB);

// FIXME refactor it to something like a Server class
const SERVER = new Koa();
const ROUTER = new Router();

// middlewares
SERVER.use(BodyParser());
SERVER.use(StaticFiles(CLIENT_FILES));
SERVER.use(ROUTER.routes());

// routes
ROUTER.post('/api/authenticate', function *() {
    let user = UserDAO.findByUsernameAndPassword(this.request.body.email, this.request.body.password);
    if (user) {
        this.body = user;
    } else {
        let error = new Error(401, `Who are you?`);
        this.status = error.statusCode;
        this.body = error.toObject();
    }
});

SERVER.listen(3000);
