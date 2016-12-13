import {RouterModule} from "@angular/router";

import {SignInComponent} from "./sign-in";
import {SignUpComponent} from "./sign-up";
import {GroceryListComponent} from "./grocery-list";
import {AuthenticatedGuard} from "./authenticated.guard";

const APP_ROUTES = [
    { path: '', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'grocery-list', component: GroceryListComponent, canActivate: [AuthenticatedGuard] }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);