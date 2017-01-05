// routes
import {SINGLETON as UserDAO} from "./user/user.dao";
import {Exception} from '../common/exception';
import { sign, verify } from "jsonwebtoken";
import {Serialize} from "cerialize";

const SUPER_SECRET = 'Z2SDgQpLzxiADLz3PD6L17kanR2qeqMgMo7gMvYeg8ASJK5H2Pnd4KxfG1Kh4dwp';

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