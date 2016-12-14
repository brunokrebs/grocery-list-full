// routes
import {SINGLETON as UserDAO} from "./user.dao";

export default {
    path: '/api/update-list',
    middleware: function *() {
        let user = UserDAO.findByEmail(this.state.user.email);
        user.items = this.request.body.items;
        UserDAO.update(user);
        this.body = {};
    }
}