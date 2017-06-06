import { Data } from './data';
import { DataArrayHolder, DataArrayHolderJSON } from './dataarrayholder';

export interface QueryJSON extends DataArrayHolderJSON {
    href: string;
    rel: string;
    name: string;
    prompt: string;
}

export class Query extends DataArrayHolder implements QueryJSON {
    href: string;
    rel: string;
    name: string;
    prompt: string;

    constructor(query: QueryJSON) {
        super(query)
        this.href = query["href"];
        this.rel = query["rel"];
        this.name = query["name"];
        this.prompt = query["prompt"];
    }

    static parseArray(queries: QueryJSON[]): Query[] {
        let query_arr: Query[] = [];
        if(queries) {
            for (let q of queries) {
                query_arr.push(new Query(q));
            }
        }
        return query_arr;
    }
}