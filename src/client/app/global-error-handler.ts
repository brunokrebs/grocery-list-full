import { ErrorHandler } from "@angular/core";

import { Error } from '../../common/error';

export class GlobalErrorHandler implements ErrorHandler {
    handleError(error : any) {
        if (error.rejection) {
            let myErrorObj: Error = error.rejection.json();
            alert(myErrorObj.statusCode + ': ' + myErrorObj.message);
        } else {
            console.log(error);
        }
    }
}