import { Query } from '../interfaces';
export declare class QueryStore {
    private queries;
    constructor();
    add(query: Query): void;
    query(rel: string): Query;
}
