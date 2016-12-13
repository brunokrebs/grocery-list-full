import {Component, ViewEncapsulation} from "@angular/core";
import {AuthenticationService} from "./authentication.service";
import {User} from "../../common/user";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    title = 'Grocery List';

    private _signedIn: boolean = null;
    private _user: User;

    constructor(private authenticationService: AuthenticationService) {
        authenticationService.signedIn$.subscribe(user => {
            this._signedIn = true;
            this._user = user;
        });
    }

    isSignedIn(): boolean {
        return this._signedIn;
    }

    user(): string {
        return this._user ? this._user.email : null;
    }
}