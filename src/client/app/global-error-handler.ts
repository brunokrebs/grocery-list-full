import { ErrorHandler } from "@angular/core";

import { Message } from '../../common/message';

export class GlobalErrorHandler implements ErrorHandler {
    handleError(error : any) {
        if (error.rejection && typeof error.rejection.json == 'function') {
            let myErrorObj: Message = error.rejection.json();
            alert(myErrorObj.statusCode + ': ' + myErrorObj.message);
        } else {
            console.log(error);
        }
    }
}