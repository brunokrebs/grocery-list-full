// routes
import {SINGLETON as UserDAO} from "./user.dao";

const SUPER_SECRET = 'change-this';

const UPDATE_USER = {
    path: '/api/update-list',
    middleware: function *() {
        let user = UserDAO.findByUsername(this.state.user.email);
        user.items = this.request.body.items;
        UserDAO.update(user);
        this.body = {};
    }
};

const USER_ROUTES = {
    posts: [ UPDATE_USER ]
};

export default USER_ROUTES;