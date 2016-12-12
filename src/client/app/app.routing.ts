import {RouterModule} from "@angular/router";

import {SignInComponent} from "./sign-in";
import {SignUpComponent} from "./sign-up";
import {PanelComponent} from "./panel";
import {AuthenticatedGuard} from "./authenticated.guard";

const APP_ROUTES = [
    { path: '', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'panel', component: PanelComponent, canActivate: [AuthenticatedGuard] }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);