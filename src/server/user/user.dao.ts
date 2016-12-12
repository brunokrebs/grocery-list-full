import {Serialize, Deserialize} from 'cerialize';

import { User } from '../../common/user';

class UserDAO {
    private static INSTANCE: UserDAO;
    private USER_DB: LokiCollection<{}>;
    private ADMIN: User;

    configure(DB: Loki) {
        this.USER_DB = DB.addCollection('user');

        let admin = this.USER_DB.findOne({
            email: 'me@brunokrebs.com'
        });
        if (!admin) {
            console.log('inserting admin user');
            this.insertUser(new User('me@brunokrebs.com', 'password', true));
        }
    }

    getAdmin() {
        return this.ADMIN;
    }

    insertUser(user: User) {
        this.USER_DB.insert(Serialize(user));
        this.USER_DB.commit();
    }

    findByUsername(email: String) {
        return this.USER_DB.findOne({
            email: email
        });
    }

    findByUsernameAndPassword(email: String, password: String) {
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

    static getInstance() {
        if (!UserDAO.INSTANCE) {
            UserDAO.INSTANCE = new UserDAO();
        }
        return UserDAO.INSTANCE;
    }
}

export const SINGLETON: UserDAO = new UserDAO();