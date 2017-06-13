import { Error } from '../interfaces/error';
import { ErrorJSON } from '../interfaces/json';

export class ErrorBase implements Error {
    public title?: string;
    public code?: string;
    public message?: string;

    constructor(error: ErrorJSON) {
        if (error) {
            this.title = error.title;
            this.code = error.code;
            this.message = error.message;
        }
    }
}
