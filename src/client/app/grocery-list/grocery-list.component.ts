import {Component} from "@angular/core";
import {AuthenticationService} from "../authentication.service";

@Component({
    selector: 'panel-component',
    templateUrl: './grocery-list.component.html',
    styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent {
    newItem: String;
    groceryList: Array<String> = ['Banana', 'Apples', 'Chocolate'];

    constructor (private authenticationService: AuthenticationService) { }

    getUser() : String {
        return this.authenticationService.user().name;
    }

    addItem() : void {
        if (this.newItem && this.newItem.trim() != '') {
            this.groceryList.push(this.newItem);
        }
        this.newItem = null;
    }

    removeItem(index: number) : void {
        this.groceryList.splice(index, 1);
    }
}