import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent, SignInComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }