import {ErrorJSON} from './json';

export interface ErrorAPI {
    json(): ErrorJSON;
}

export interface CollectionError extends ErrorJSON, ErrorAPI {}
