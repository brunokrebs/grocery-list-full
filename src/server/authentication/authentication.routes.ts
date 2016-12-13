// routes
import {SINGLETON as UserDAO} from "../user/user.dao";
import {Message} from '../../common/message';
import {Deserialize} from "cerialize";
import { sign as signJWT, verify as verifyJWT } from "jsonwebtoken";

const SUPER_SECRET = 'change-this';

const SIGN_UP = {
    path: '/api/sign-up',
    middleware: function *() {
        let user = UserDAO.findByUsername(this.request.body.email);
        if (user) {
            let error = new Message(401, `E-mail already registered.`);
            this.status = error.statusCode;
            this.body = error.toObject();
            return;
        }
        UserDAO.insertUser(Deserialize(this.request.body));
        this.body = UserDAO.findByUsernameAndPassword(this.request.body.email, this.request.body.password);
    }
};

const SIGN_IN = {
    path: '/api/sign-in',
    middleware: function *() {
        let user = UserDAO.findByUsernameAndPassword(this.request.body.email, this.request.body.password);
        if (user) {
            delete user.password;
            user.token = signJWT(user, SUPER_SECRET);
            this.body = user;
        } else {
            let error = new Message(401, `Who are you?`);
            this.status = error.statusCode;
            this.body = error.toObject();
        }
    }
};

const SECURED_ROUTES = {
    path: /^\/api\/(.*)(?:\/|$)/,
    middleware: function *(next) {
        try {
            let token = this.request.headers['authorization'];
            this.state.user = verifyJWT(token.replace('Bearer ', ''), SUPER_SECRET);
            yield next;
        } catch (err) {
            let error = new Message(401, `Who are you?`);
            this.status = error.statusCode;
            this.body = error.toObject();
        }
    }
};

const AUTHENTICATION_ROUTES = {
    posts: [ SIGN_UP, SIGN_IN, SECURED_ROUTES ]
};

export default AUTHENTICATION_ROUTES;