import {Component} from "@angular/core";
import {Credentials} from "../../../common/credentials";
import {AuthenticationService} from "../authentication.service";

@Component({
    selector: 'sign-up',
    templateUrl: './sign-up.component.html'
})
export class SignUpComponent {
    credentials: Credentials = new Credentials();

    constructor(private authenticationService: AuthenticationService) { }

    signUp(): void {
        this.authenticationService
            .signUp(this.credentials);
    }
}