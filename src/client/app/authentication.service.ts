import {Injectable, OnInit}   from '@angular/core';
import { Http }                             from '@angular/http';
import { Subject }                          from 'rxjs/Subject';

import 'rxjs/add/operator/toPromise';

import { Serialize, Deserialize }                        from 'cerialize';
import { Credentials }                      from '../../common/credentials';
import {User} from "../../common/user";

@Injectable()
export class AuthenticationService implements OnInit {
    private signedInSource = new Subject<User>();
    private authEndpoint = '/api/authenticate';
    private _user: User;

    public signedIn$ = this.signedInSource.asObservable();

    constructor(private http: Http) { }

    ngOnInit(): void {
        // FIXME load bearer token from localStorage
    }

    authenticate(credentials: Credentials): Promise<User> {
        return this.http.post(this.authEndpoint, Serialize(credentials))
            .toPromise()
            .then(response => {
                this._user = Deserialize(response.json(), User);
                this.signedInSource.next(this._user);
                return this._user;
            });
    }

    isSignedIn(): boolean {
        return this._user == null;
    }

    user(): User {
        return this._user;
    }
}