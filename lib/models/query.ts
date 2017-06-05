import { Data } from './data';

export interface QueryJSON {
    href: string;
    rel: string;
    name: string;
    prompt: string;
    data: Data[];
}

export class Query implements QueryJSON {
    href: string;
    rel: string;
    name: string;
    prompt: string;
    data: Data[];

    constructor(query: QueryJSON) {
        this.href = query["href"];
        this.rel = query["rel"];
        this.name = query["name"];
        this.prompt = query["prompt"];
        this.data = Data.parseArray(query["data"]);
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