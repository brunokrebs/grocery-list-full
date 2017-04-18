// routes
import {Exception} from "../common/exception";
import {verify} from "jsonwebtoken";
import * as JwksRsa from "jwks-rsa";

let signingKey = null;

let jwksClient = JwksRsa({
    jwksUri: "https://bkrebs.auth0.com/.well-known/jwks.json"
});

jwksClient.getSigningKey('RDUzRkIxMEQ1MTVDNTY4MDAwNENCNUYzNkM3RjRFQjEyOUU5NzA3Qg', (err, key) => {
    signingKey = key.publicKey || key.rsaPublicKey;
});

export const SECURED_ROUTES = {
    path: /^\/api\/(.*)(?:\/|$)/,
    middleware: function *(next) {
        try {
            let token = this.request.headers['authorization'];
            this.state.user = verify(token.replace('Bearer ', ''), signingKey);
            yield next;
        } catch (err) {
            throw new Exception(401, 'Uknown user!');
        }
    }
};
