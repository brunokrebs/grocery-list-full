import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {AuthenticationService} from "../authentication.service";
import {User} from "../../../common/user";

@Component({
    selector: 'panel-component',
    templateUrl: './grocery-list.component.html',
    styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent {
    private updateList = '/api/update-list';
    newItem: String;

    constructor (private authenticationService: AuthenticationService, private http: Http) { }

    getItems() : Array<String> {
        return this.getUser().items;
    }

    addItem() : void {
        if (this.newItem && this.newItem.trim() != '') {
            if (!this.getUser().items) {
                this.getUser().items = [];
            }

            this.getUser().items.push(this.newItem);

            this.http.post(this.updateList, this.getUser())
                .toPromise();
        }
        this.newItem = null;
    }

    removeItem(index: number) : void {
        this.getUser().items.splice(index, 1);
    }

    private getUser(): User {
        return this.authenticationService.user();
    }
}