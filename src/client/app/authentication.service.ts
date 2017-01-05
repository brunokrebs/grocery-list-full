import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {User} from "../../common/user";
import {Router} from "@angular/router";

const Auth0Lock = require('auth0-lock').default;

const AUTH0_CLIENT_ID = "pe1TeJnjahK0nZR0Q1waZlMCAJg0sNz6";
const AUTH0_DOMAIN = "brunokrebs.auth0.com";

@Injectable()
export class AuthenticationService {
    private _user: any;
    private lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
        auth: {
            params: { scope: 'openid email' }
        }
    });

    constructor(private http: Http, private router: Router) {
        // We'll listen for an authentication event to be raised and if successful will log the user in.
        this.lock.on('authenticated', (authResult: any) => {
            this.onAuthenticated.call(this, authResult);
        });
    }

    private onAuthenticated(authResult: any): void {
        localStorage.setItem('id_token', authResult.idToken);

        this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
            if (error) {
                console.log(error);
            }
            this._user = profile;

            localStorage.setItem('profile', profile);
            this.router.navigateByUrl('/grocery-list');
        });

        this.lock.hide();
    }

    showSignInScreen(): void {
        this.lock.show();
    }

    user(): any {
        return this._user;
    }
}