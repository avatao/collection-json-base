import {DataJSON} from './json';

export interface DataStoreAPI {
    json(): DataJSON[];
}
