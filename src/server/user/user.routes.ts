// routes
import {SINGLETON as UserDAO} from "./user.dao";

export const UPDATE_LIST = {
    path: '/api/update-list',
    middleware: function *() {
        let user = UserDAO.findByEmail(this.state.user.email);
        user.items = this.request.body.items;
        UserDAO.update(user);
        this.body = {};
    }
};

export const GET_LIST = {
    path: '/api/list',
    middleware: function *() {
        let user = UserDAO.findByEmail(this.state.user.email);
        if (!user) {
            // new users must be persisted before being able to fill data
            user = {
                email: this.state.user.email,
                items: []
            };
            UserDAO.insertUser(user);
        }
        this.body = user.items;
    }
};