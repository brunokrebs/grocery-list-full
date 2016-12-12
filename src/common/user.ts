import {autoserialize} from "cerialize";

export class User {
    @autoserialize public email: String;
    @autoserialize public password: String;
    @autoserialize public admin: boolean;

    constructor(email: String, password: String, admin?: boolean) {
        this.email = email;
        this.password = password;
        this.admin = admin;
    }
}