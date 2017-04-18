// // routes
// import {Exception} from "../common/exception";
// import {verify} from "jsonwebtoken";
//
// import {JwksClient, Options} from "node-jwks-rsa";
//
// const SUPER_SECRET = 'change-this';
//
// export const SECURED_ROUTES = {
//     path: /^\/api\/(.*)(?:\/|$)/,
//     middleware: function *(next) {
//         try {
//             let token = this.request.headers['authorization'];
//             const options: Options = {
//                 jwksUri: 'https://bkrebs.auth0.com/.well-known/jwks.json'
//             };
//
//             const client = new JwksClient(options);
//             client.getSigningKey();
//             this.state.user = verify(token.replace('Bearer ', ''), SUPER_SECRET);
//             yield next;
//         } catch (err) {
//             throw new Exception(401, 'Uknown user');
//         }
//     }
// };