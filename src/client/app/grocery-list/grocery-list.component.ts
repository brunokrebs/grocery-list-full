import {Component} from "@angular/core";
import {AuthenticationService} from "../authentication.service";

@Component({
    selector: 'panel-component',
    templateUrl: './grocery-list.component.html',
    styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent {
    constructor (private authenticationService: AuthenticationService) { }

    getUser() : String {
        return this.authenticationService.user().name;
    }
}