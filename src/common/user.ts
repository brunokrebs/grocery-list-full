import {autoserialize} from "cerialize";

export class User {
    @autoserialize public email: string;
    @autoserialize public password: string;
    @autoserialize public admin: boolean;
    @autoserialize public name: string;
    @autoserialize public token: string;
    @autoserialize public items: Array<string>;

    constructor(email?: string, password?: string, name?: string,
                admin?: boolean, items?: Array<string>) {
        this.email = email;
        this.password = password;
        this.admin = admin;
        this.name = name;
        this.items = items;
    }
}