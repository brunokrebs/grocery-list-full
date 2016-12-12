import * as Router from "koa-router";
import * as fs from "fs";
import AUTHENTICATION_ROUTES from "./authentication/authentication.routes";

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

AUTHENTICATION_ROUTES.posts
    .forEach(route => ROUTER.post(route.path, route.middleware));

export default ROUTER;