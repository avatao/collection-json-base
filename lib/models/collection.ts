import { Link } from './link';
import { Item } from './item';
import { Query } from './query';
import { Template } from './template';
import { Error } from './error'

export class Collection {
    private version: string;
    private href: string;
    private links: Link[];
    private items: Item[];
    private queries: Query[];
    private template: Template;
    private error: Error;

    parse(jsontext: string): void {
        let json = JSON.parse(jsontext)["collection"];
        this.version = json["version"] || '1.0';
        this.href = json["href"]
        this.links = Link.parseArray(json["links"]);
        this.items = Item.parseArray(json["items"]);
        this.queries = Query.parseArray(json["query"]);
        this.template = new Template(json["template"]);
        this.error = new Error(json["error"]);
    }

    link(rel: string): string {
        return Link.findLink(this.links, rel);
    }
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