import {Exception} from "../common/exception";

export default function *(next) {
    try {
        yield next;
    } catch (err) {
        if (err instanceof Exception) {
            this.body = err.toObject();
            this.status = err.statusCode;
        } else {
            this.body = { message: 'Unexpected error.' };
            this.status = 500;
        }
    }
};