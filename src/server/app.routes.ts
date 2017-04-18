import * as Router from "koa-router";
import * as fs from "fs";
import { UPDATE_LIST, GET_LIST } from "./user/user.routes";
import * as Jwt from "koa-jwt";
import * as JwksRsa from "jwks-rsa";

// refers to anything that starts with /api/
const API_PREFIX = /^\/api\/(.*)(?:\/|$)/;

const ROUTER = new Router();

const LOAD_HTML = function() {
    return new Promise(function (resolve, reject) {
        fs.readFile('./dev/client/index.html', {'encoding': 'utf8'}, function (err, data) {
            if(err) return reject(err);
            resolve(data);
        });
    });
};

ROUTER.get(/^\/(.*)(?:\/|$)/, function *(next) {
    if (this.request.url.startsWith("/api")) {
        yield next;
    } else {
        this.body = yield LOAD_HTML();
    }
});

const opts: JwksRsa.Options = {
    jwksUri: 'https://bkrebs.auth0.com/.well-known/jwks.json',
};
const jwksClient = JwksRsa(opts);

ROUTER.post(API_PREFIX, Jwt({
    secret: jwksClient,
    audience: 'grocery-list-api',
    issuer: 'https://bkrebs.auth0.com/'
}));

// securing any path that is 'GET' from now on
ROUTER.get(API_PREFIX, Jwt({
    secret: jwksClient,
    audience: 'grocery-list-api',
    issuer: 'https://bkrebs.auth0.com/'
}));

ROUTER.post(UPDATE_LIST.path, UPDATE_LIST.middleware);
// adding the new '/api/list' endpoint
ROUTER.get(GET_LIST.path, GET_LIST.middleware);

export default ROUTER;