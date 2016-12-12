import {NgModule, ErrorHandler} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {GlobalErrorHandler} from "./global-error-handler";
import {SignInComponent} from "./sign-in";
import {Routing} from "./app.routing";

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent, SignInComponent
    ],
    imports: [
        BrowserModule, HttpModule, FormsModule, Routing
    ],
    providers: [
        { provide: ErrorHandler, useClass: GlobalErrorHandler}
    ]
})
export class AppModule { }