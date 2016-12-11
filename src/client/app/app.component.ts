import { Component } from '@angular/core';
import {AuthenticationService} from "./authentication.service";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [AuthenticationService]
})
export class AppComponent {
    title = `KLAN - Koa, LokiJS, Angular 2 and Node app`;

    private _signedIn: boolean = null;

    constructor(private authenticationService: AuthenticationService) {
        authenticationService.signedIn$.subscribe(user => {
            this._signedIn = true;
        });
    }

    isSignedIn(): boolean {
        return this._signedIn;
    }

    user(): String {
        return this.authenticationService.user();
    }
}