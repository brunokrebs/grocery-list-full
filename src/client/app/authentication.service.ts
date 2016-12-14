import {Injectable, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/toPromise";
import {Credentials} from "../../common/credentials";
import {User} from "../../common/user";
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationService implements OnInit {
    private signedInSource = new Subject<User>();
    private authEndpoint = '/api/sign-in';
    private signUpEndpoint = '/api/sign-up';
    private _user: User;

    public signedIn$ = this.signedInSource.asObservable();

    constructor(private http: Http, private router: Router) { }

    ngOnInit(): void {
        // FIXME load bearer token from localStorage
    }

    private onAuthenticated(response: any): void {
        this._user = response.json().user;
        localStorage.setItem('id_token', response.json().token);
        this.signedInSource.next(this._user);
        this.router.navigate(['/grocery-list']);
    }

    authenticate(credentials: Credentials): Promise<void> {
        return this.http.post(this.authEndpoint, credentials)
            .toPromise()
            .then(response => {
                this.onAuthenticated.call(this, response);
            });
    }

    signUp(user: User): Promise<void> {
        return this.http.post(this.signUpEndpoint, user)
            .toPromise()
            .then(response => {
                this.onAuthenticated.call(this, response);
            });
    }

    isSignedIn(): boolean {
        return this._user != null;
    }

    user(): User {
        return this._user;
    }
}