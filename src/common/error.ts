export class Error {
    private _statusCode: number;
    private _message: String;

    constructor(statusCode: number, message: String) {
        this._statusCode = statusCode;
        this._message = message;
    }

    get statusCode(): number {
        return this._statusCode;
    }

    get message(): String {
        return this._message;
    }

    toObject(): Object {
        return {
            statusCode: this._statusCode,
            message: this._message
        }
    }
}