import {DataJSON} from './json';

export interface DataAPI {
    json(): DataJSON;
}

export interface Data extends DataJSON, DataAPI {}
