import { DataArrayHolder, DataArrayHolderJSON } from './dataarrayholder';

export interface QueryJSON extends DataArrayHolderJSON {
    href: string;
    rel: string;
    name: string;
    prompt: string;
}

export class Query extends DataArrayHolder implements QueryJSON {
    public href: string;
    public rel: string;
    public name: string;
    public prompt: string;

    constructor(query: QueryJSON) {
        super(query);
        this.href = query.href;
        this.rel = query.rel;
        this.name = query.name;
        this.prompt = query.prompt;
    }

    public static parseArray(queries: QueryJSON[]): Query[] {
        const queryArray: Query[] = [];
        if (queries) {
            for (const q of queries) {
                queryArray.push(new Query(q));
            }
        }
        return queryArray;
    }
}
