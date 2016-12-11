import {Component} from "@angular/core";
import {AuthenticationService} from "../authentication.service";
import {Credentials} from "../../../common/credentials";

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html'
})
export class SignInComponent {

    credentials: Credentials = new Credentials();

    constructor(private authenticationService: AuthenticationService) { }

    signIn(): void {
        this.authenticationService
            .authenticate(this.credentials);
    }
}