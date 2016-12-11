import {Injectable, OnInit}   from '@angular/core';
import { Http }                             from '@angular/http';
import { Subject }                          from 'rxjs/Subject';

import 'rxjs/add/operator/toPromise';

import { Serialize }                        from 'cerialize';
import { Credentials }                      from '../../common/credentials';

@Injectable()
export class AuthenticationService implements OnInit {
    private signedInSource = new Subject<String>();
    private authEndpoint = '/api/authenticate';
    private _user: String;

    public signedIn$ = this.signedInSource.asObservable();

    constructor(private http: Http) { }

    ngOnInit(): void {
        // FIXME load bearer token from localStorage
    }

    authenticate(credentials: Credentials): Promise<any> {
        return this.http.post(this.authEndpoint, Serialize(credentials))
            .toPromise()
            .then(response => {
                this._user = response.json().email;
                this.signedInSource.next(this._user);
                return response;
            });
    }

    isSignedIn(): boolean {
        return this._user == null;
    }

    user(): String {
        return this._user;
    }
}