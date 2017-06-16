import {CollectionError, ErrorJSON} from '../interfaces';

export class ErrorBase implements CollectionError {
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
