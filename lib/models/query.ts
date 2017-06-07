import { DataArrayHolderBase, DataArrayHolderJSON } from './dataarrayholder';

export interface QueryJSON extends DataArrayHolderJSON {
    href: string;
    rel: string;
    name: string;
    prompt: string;
}

export interface QueryAPI {}

export interface Query extends QueryJSON, QueryAPI {}

export class QueryBase extends DataArrayHolderBase implements Query {
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
}
