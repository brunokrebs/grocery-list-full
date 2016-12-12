import * as Koa from "koa";
import * as StaticFiles from "koa-static";
import * as BodyParser from "koa-bodyparser";
import * as Lokijs from "lokijs";
import {SINGLETON as UserDAO} from "./user/user.dao";
import ROUTER from "./app.routes";

const CLIENT_FILES = './dev/client/';

const DB = new Lokijs('klan-database.json', {
    autosave: true
});

UserDAO.configure(DB);

// FIXME refactor it to something like a Server class
const SERVER = new Koa();

// middlewares
SERVER.use(BodyParser());
SERVER.use(StaticFiles(CLIENT_FILES));
SERVER.use(ROUTER.routes());

SERVER.listen(3000);
