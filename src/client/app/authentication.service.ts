import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthenticationService implements OnInit {
    private authEndpoint = '/api/authenticate';

    constructor(private http: Http) { }

    ngOnInit(): void {
        // FIXME load bearer token from localStorage
    }

    authenticate(): Promise<String> {
        return this.http.get(this.authEndpoint)
            .toPromise()
            .then(response => response.json().data as String)
            .catch(AuthenticationService.handleError);
    }

    private static handleError(error: any): Promise<any> {
        // FIXME replace with a proper logger service
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}