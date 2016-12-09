import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { HttpModule }       from '@angular/http';

import { AppComponent }     from './app.component';
import { SignInComponent }  from './sign-in';

@NgModule({
    imports: [
        BrowserModule, HttpModule
    ],
    declarations: [
        AppComponent, SignInComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }