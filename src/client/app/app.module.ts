import {NgModule, ErrorHandler} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {GlobalErrorHandler} from "./global-error-handler";
import {GroceryListComponent} from "./grocery-list";
import {SignInComponent} from "./sign-in";
import {Routing} from "./app.routing";
import {SignUpComponent} from "./sign-up";
import {AuthenticatedGuard} from "./authenticated.guard";
import {AuthenticationService} from "./authentication.service";
import {AUTH_PROVIDERS} from "angular2-jwt";

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent, SignInComponent, SignUpComponent, GroceryListComponent
    ],
    imports: [
        BrowserModule, HttpModule, FormsModule, Routing
    ],
    providers: [
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        AuthenticationService,
        AuthenticatedGuard,
        AUTH_PROVIDERS
    ]
})
export class AppModule { }