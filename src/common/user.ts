import {autoserialize} from "cerialize";

export class User {
    @autoserialize public email: String;
    @autoserialize public password: String;
    @autoserialize public admin: boolean;
    @autoserialize public name: String;

    constructor(email: String, password: String, name?: String, admin?: boolean) {
        this.email = email;
        this.password = password;
        this.admin = admin;
        this.name = name;
    }
}