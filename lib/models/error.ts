export interface ErrorJSON {
    title: string;
    code: string;
    message: string;    
}

export class Error implements ErrorJSON {
    title: string;
    code: string;
    message: string;

    constructor(error: ErrorJSON) {
        if(error) {
            this.title = error["title"];
            this.code = error["code"];
            this.message = error["message"];
        }
    }
}