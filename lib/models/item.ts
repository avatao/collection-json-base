import { Data } from './data';
import { Link } from './link';

export interface ItemJSON {
    href: string;
    data: Data[];
    links: Link[];
}

export class Item implements ItemJSON {
    href: string;
    data: Data[];
    links: Link[];

    constructor(item: ItemJSON) {
        this.href = item["href"];
        this.data = Data.parseArray(item["data"]);
        this.links = Link.parseArray(item["links"]);
    }

    link(rel: string): string {
        return Link.findLink(this.links, rel);
    }

    static parseArray(items: ItemJSON[]) {
        let item_arr: Item[] = [];
        if(items) {
            for (let i of items) {
                item_arr.push(new Item(i));
            }
        }
        return item_arr;
    }
}