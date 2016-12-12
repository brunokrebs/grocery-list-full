// routes
import {SINGLETON as UserDAO} from "../user/user.dao";
import {Message} from '../../common/message';
import {Deserialize} from "cerialize";

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
            this.body = user;
        } else {
            let error = new Message(401, `Who are you?`);
            this.status = error.statusCode;
            this.body = error.toObject();
        }
    }
};

const AUTHENTICATION_ROUTES = {
    posts: [ SIGN_UP, SIGN_IN ]
};

export default AUTHENTICATION_ROUTES;