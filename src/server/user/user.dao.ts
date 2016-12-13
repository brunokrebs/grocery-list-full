import {Serialize, Deserialize} from 'cerialize';

import { User } from '../../common/user';

class UserDAO {
    private static INSTANCE: UserDAO;
    private USER_DB: LokiCollection<{}>;
    private ADMIN: User;

    configure(DB: Loki) {
        let instance = this;
        DB.loadDatabase({}, function () {
            instance.USER_DB = DB.getCollection('user');
            if (!instance.USER_DB) {
                instance.USER_DB = DB.addCollection('user');
            }

            let admin = instance.USER_DB.findOne({
                email: 'me@brunokrebs.com'
            });
            if (!admin) {
                console.log('inserting admin user');
                instance.insertUser(new User('me@brunokrebs.com', 'password', 'Bruno Krebs', true));
            }
        });
    }

    getAdmin() {
        return this.ADMIN;
    }

    insertUser(user: User) {
        this.USER_DB.insert(Serialize(user));
        this.USER_DB.commit();
    }

    findByUsername(email: String): any {
        return this.USER_DB.findOne({
            email: email
        });
    }

    findByUsernameAndPassword(email: String, password: String) : User {
        let userFound = this.USER_DB.findOne({
            $and: [
                { email: email },
                { password: password }
            ]
        });

        if (!userFound) {
            return null;
        }
        return Deserialize(userFound, User);
    }

    update(user: User): void {
        this.USER_DB.update(user);
    }

    static getInstance() {
        if (!UserDAO.INSTANCE) {
            UserDAO.INSTANCE = new UserDAO();
        }
        return UserDAO.INSTANCE;
    }
}

export const SINGLETON: UserDAO = new UserDAO();