import {RouterModule} from "@angular/router";

import {SignInComponent} from "./sign-in/sign-in.component";

const APP_ROUTES = [
    { path: '', component: SignInComponent }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);