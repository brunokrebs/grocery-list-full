import * as Router from "koa-router";
import AUTHENTICATION_ROUTES from "./authentication/authentication.routes";

const ROUTER = new Router();

AUTHENTICATION_ROUTES.posts
    .forEach(route => ROUTER.post(route.path, route.middleware));

export default ROUTER;