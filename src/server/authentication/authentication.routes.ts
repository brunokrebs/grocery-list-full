// routes
import {SINGLETON as UserDAO} from "../user/user.dao";
import {Exception} from '../../common/exception';
import { sign as signJWT, verify as verifyJWT } from "jsonwebtoken";
import {Serialize} from "cerialize";

const SUPER_SECRET = 'change-this';

const SIGN_UP = {
    path: '/api/sign-up',
    middleware: function *() {
        let user = UserDAO.findByEmail(this.request.body.email);
        if (user) {
            throw new Exception(401, 'E-mail already registered.');
        }
        UserDAO.insertUser(this.request.body);
        user = UserDAO.findByEmail(this.request.body.email);
        this.body = {
            token: signJWT(user, SUPER_SECRET),
            user: Serialize(user)
        };
    }
};

const SIGN_IN = {
    path: '/api/sign-in',
    middleware: function *() {
        let user = UserDAO.findByEmail(this.request.body.email);
        if (user && this.request.body.password == user.password) {
            this.body = {
                token: signJWT(user, SUPER_SECRET),
                user: Serialize(user)
            };
        } else {
            throw new Exception(401, 'Uknown user');
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
            throw new Exception(401, 'Uknown user');
        }
    }
};

const AUTHENTICATION_ROUTES = {
    posts: [ SIGN_UP, SIGN_IN, SECURED_ROUTES ]
};

export default AUTHENTICATION_ROUTES;