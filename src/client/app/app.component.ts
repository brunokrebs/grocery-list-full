import {Component, ViewEncapsulation} from "@angular/core";
import {AuthenticationService} from "./authentication.service";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    title = 'Grocery List';

    constructor(private authenticationService: AuthenticationService) { }

    signIn() {
        this.authenticationService.showSignInScreen();
    }
}