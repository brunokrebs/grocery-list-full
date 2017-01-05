import * as Router from "koa-router";
import * as fs from "fs";
import { UPDATE_LIST, GET_LIST } from "./user/user.routes";
import { SECURED_ROUTES } from "./authentication.routes";

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

ROUTER.post(SECURED_ROUTES.path, SECURED_ROUTES.middleware);
ROUTER.get(SECURED_ROUTES.path, SECURED_ROUTES.middleware);

ROUTER.post(UPDATE_LIST.path, UPDATE_LIST.middleware);
ROUTER.get(GET_LIST.path, GET_LIST.middleware);

export default ROUTER;