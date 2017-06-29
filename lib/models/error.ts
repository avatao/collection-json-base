import {CollectionError, ErrorJSON} from '../interfaces';

export class ErrorBase implements CollectionError {
    public title?: string;
    public code?: string;
    public message?: string;

    constructor(error: ErrorJSON) {
        if (typeof error.title !== 'undefined') {
            this.title = error.title;
        }

        if (typeof error.code !== 'undefined') {
            this.code = error.code;
        }

        if (typeof error.message !== 'undefined') {
            this.message = error.message;
        }
    }

    public json(): ErrorJSON {
        const result: ErrorJSON = {};

        if (typeof this.title !== 'undefined') {
            result.title = this.title;
        }

        if (typeof this.code !== 'undefined') {
            result.code = this.code;
        }

        if (typeof this.message !== 'undefined') {
            result.message = this.message;
        }

        return result;
    }

}
