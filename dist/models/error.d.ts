import { Error } from '../interfaces/error';
import { ErrorJSON } from '../interfaces/json';
export declare class ErrorBase implements Error {
    title?: string;
    code?: string;
    message?: string;
    constructor(error: ErrorJSON);
}
