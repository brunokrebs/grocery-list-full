import {RouterModule} from "@angular/router";

import {GroceryListComponent} from "./grocery-list/grocery-list.component";
import {AuthenticatedGuard} from "./authenticated.guard";

const APP_ROUTES = [
    { path: 'grocery-list', component: GroceryListComponent, canActivate: [AuthenticatedGuard] }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);