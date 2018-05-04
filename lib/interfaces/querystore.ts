import {QueryJSON} from './json';
import {QueryBase} from '../models';

export interface QueryStoreAPI {
    add(query: QueryBase): void;
    query(rel: string): QueryBase | undefined;
    json(): QueryJSON[];
}
