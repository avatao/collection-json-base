import {CollectionError, ErrorJSON} from '../interfaces';

export class ErrorBase implements CollectionError {
    public title?: string;
    public code?: string;
    public message?: string;

    constructor(error: ErrorJSON) {
        if (error.title) {
            this.title = error.title;
        }

        if (error.code) {
            this.code = error.code;
        }

        if (error.message) {
            this.message = error.message;
        }
    }

    public json(): ErrorJSON {
        const result: ErrorJSON = {};

        if (this.title) {
            result.title = this.title;
        }

        if (this.code) {
            result.code = this.code;
        }

        if (this.message) {
            result.message = this.message;
        }

        return result;
    }

}
