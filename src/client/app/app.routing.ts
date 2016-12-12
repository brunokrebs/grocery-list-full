import {RouterModule} from "@angular/router";

import {SignInComponent} from "./sign-in";
import {SignUpComponent} from "./sign-up";
import {PanelComponent} from "./panel";

const APP_ROUTES = [
    { path: '', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'panel', component: PanelComponent }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);