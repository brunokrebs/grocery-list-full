export class User {
    public email: string;
    public token?: string;
    public items: Array<string>;

    public static OnSerialized(instance : User, json : any) : void {
        delete json.password;
        delete json.meta;
    }
}