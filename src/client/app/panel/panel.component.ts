import {Component} from "@angular/core";
import {AuthenticationService} from "../authentication.service";

@Component({
    selector: 'panel-component',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
    constructor (private authenticationService: AuthenticationService) { }

    getUser() : String {
        return this.authenticationService.user().name;
    }
}