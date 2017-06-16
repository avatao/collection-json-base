import { Query } from '../interfaces/query';
export declare class QueryStore {
    private queries;
    constructor();
    add(query: Query): void;
    query(rel: string): Query;
}
