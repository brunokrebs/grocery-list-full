import {Component} from "@angular/core";
import {AuthenticationService} from "../authentication.service";
import {User} from "../../../common/user";
import {AuthHttp} from "angular2-jwt";

@Component({
    selector: 'panel-component',
    templateUrl: './grocery-list.component.html',
    styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent {
    private updateList = '/api/update-list';
    newItem: string;

    constructor (private authenticationService: AuthenticationService, private authHttp: AuthHttp) { }

    getItems() : Array<string> {
        return this.getUser().items;
    }

    addItem() : void {
        if (this.newItem && this.newItem.trim() != '') {
            if (!this.getUser().items) {
                this.getUser().items = [];
            }

            this.getUser().items.push(this.newItem);

            this.authHttp.post(this.updateList, this.getUser())
                .subscribe(
                    data => this.newItem = null,
                    err => console.log(err)
                );
        }
    }

    removeItem(index: number) : void {
        this.getUser().items.splice(index, 1);
    }

    private getUser(): User {
        return this.authenticationService.user();
    }
}