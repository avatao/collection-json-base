import { Data } from './data';
import { DataArrayHolder, DataArrayHolderJSON } from './dataarrayholder';
import { Link } from './link';

export interface ItemJSON extends DataArrayHolderJSON {
    href: string;
    links: Link[];
}

export class Item extends DataArrayHolder implements ItemJSON {
    href: string;
    links: Link[];

    constructor(item: ItemJSON) {
        super(item);
        this.href = item["href"];
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