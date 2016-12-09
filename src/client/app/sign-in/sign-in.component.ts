import { Component } from '@angular/core';

import { AuthenticationService }  from '../authentication.service';

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html',
    providers: [AuthenticationService]
})
export class SignInComponent {

    private user: String = null;

    constructor(private authenticationService: AuthenticationService) { }

    signIn(): void {
        this.authenticationService.authenticate()
            .then(obj => this.user = obj['username']);
    }

    signOut(): void {
        this.user = null;
    }

    isAuthenticated(): boolean {
        return this.user != null;
    }

    getUsername(): String {
        return this.user;
    }
}