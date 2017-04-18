// routes
import {Exception} from '../common/exception';
import {verify} from "jsonwebtoken";

const SUPER_SECRET = 'F7O9nLhowRQcJlaB_kHJaDBNBgnpPuuOssu-3lxCYukuag9pAPuuTzY3XyGn8uXv';


export const SECURED_ROUTES = {
    path: /^\/api\/(.*)(?:\/|$)/,
    middleware: function *(next) {
        try {
            let token = this.request.headers['authorization'];
            this.state.user = verify(token.replace('Bearer ', ''), SUPER_SECRET);
            yield next;
        } catch (err) {
            throw new Exception(401, 'Uknown user');
        }
    }
};