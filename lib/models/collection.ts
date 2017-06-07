import { Error } from './error';
import { Item } from './item';
import { Link, LinkJSON } from './link';
import { Query } from './query';
import { Template } from './template';

export abstract class Collection<LinkImpl extends Link>{
    private version: string;
    private href: string;
    private links: Link[];
    private items: Array<Item<LinkImpl>>;
    private queries: Query[];
    private template: Template;
    private error: Error;

    constructor(url: string, private linkimpl: {new(link: LinkJSON): LinkImpl}) {
        this.load(url);
    }

    public parse(jsontext: string): void {
        const json = JSON.parse(jsontext).collection;
        this.version = json.version || '1.0';
        this.href = json.href;
        this.links = Link.parseArray<LinkImpl>(json.links, this.linkimpl);
        this.items = Item.parseArray<LinkImpl>(json.items, this.linkimpl);
        this.queries = Query.parseArray(json.query);
        this.template = new Template(json.template);
        this.error = new Error(json.error);
    }

    public link(rel: string): string {
        return Link.findLink(this.links, rel);
    }

    public abstract load(url: string): void;
    // TODO: make this work
    /*
    static parseArray<TJSON, T>(elements: TJSON, t: {new(): T; }): T[] {
        let elem_arr: T[] = [];
        if(elements) {
            for(let e of elements) {
                elem_arr.push(new t(e));
            }
        }
        return elem_arr;
    }
    */
}
