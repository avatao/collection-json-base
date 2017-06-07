export interface ErrorJSON {
    title: string;
    code: string;
    message: string;
}

export interface ErrorAPI {}

export interface Error extends ErrorJSON, ErrorAPI {}

export class ErrorBase implements Error {
    public title: string;
    public code: string;
    public message: string;

    constructor(error: ErrorJSON) {
        if (error) {
            this.title = error.title;
            this.code = error.code;
            this.message = error.message;
        }
    }
}
