// routes
import {SINGLETON as UserDAO} from "../user/user.dao";
import {Exception} from '../../common/exception';
import {Deserialize} from "cerialize";
import { sign as signJWT, verify as verifyJWT } from "jsonwebtoken";

const SUPER_SECRET = 'change-this';

const SIGN_UP = {
    path: '/api/sign-up',
    middleware: function *() {
        let user = UserDAO.findByUsername(this.request.body.email);
        if (user) {
            throw new Exception(401, 'E-mail already registered.');
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