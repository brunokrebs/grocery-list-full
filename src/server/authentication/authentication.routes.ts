// routes
import {SINGLETON as UserDAO} from "../user/user.dao";
import {Error} from '../../common/error';

const AUTHENTICATE = {
    path: '/api/authenticate',
    middleware: function *() {
        let user = UserDAO.findByUsernameAndPassword(this.request.body.email, this.request.body.password);
        if (user) {
            this.body = user;
        } else {
            let error = new Error(401, `Who are you?`);
            this.status = error.statusCode;
            this.body = error.toObject();
        }
    }
};

const AUTHENTICATION_ROUTES = {
    posts: [ AUTHENTICATE ]
};

export default AUTHENTICATION_ROUTES;