import { CollectionError, ErrorJSON } from '../interfaces';
export declare class ErrorBase implements CollectionError {
    title?: string;
    code?: string;
    message?: string;
    constructor(error: ErrorJSON);
}
