import {RouterModule} from "@angular/router";

import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";

const APP_ROUTES = [
    { path: '', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);