export class Message {
    private _statusCode: number;
    private _message: string;

    constructor(statusCode: number, message: string) {
        this._statusCode = statusCode;
        this._message = message;
    }

    get statusCode(): number {
        return this._statusCode;
    }

    get message(): string {
        return this._message;
    }

    toObject(): Object {
        return {
            statusCode: this._statusCode,
            message: this._message
        }
    }
}