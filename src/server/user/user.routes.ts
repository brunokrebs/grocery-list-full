// routes
import {SINGLETON as UserDAO} from "./user.dao";
import {Message} from '../../common/message';

import { verify as verifyJWT } from "jsonwebtoken";

const SUPER_SECRET = 'change-this';

const UPDATE_USER = {
    path: '/api/update-list',
    middleware: function *() {
        let token = this.request.headers['authorization'];
        verifyJWT(token.replace('Bearer ', ''), SUPER_SECRET, (err, decoded) => {
            console.log(err);
            console.log(decoded);
        });

        let user = UserDAO.findByUsername(this.request.body.email);
        if (user) {
            user.items = this.request.body.items;
            UserDAO.update(user);
            this.body = (new Message(200, 'List updated.')).toObject();
        } else {
            this.body = (new Message(400, 'User not found.')).toObject();
        }
    }
};

const USER_ROUTES = {
    posts: [ UPDATE_USER ]
};

export default USER_ROUTES;