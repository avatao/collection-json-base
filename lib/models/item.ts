import { Data } from './data';
import { DataArrayHolder, DataArrayHolderJSON } from './dataarrayholder';
import { Link, LinkJSON } from './link';

export interface ItemJSON extends DataArrayHolderJSON {
    href: string;
    links: Link[];
}

export class Item<LinkImpl extends Link> extends DataArrayHolder implements ItemJSON {
    href: string;
    links: Link[];

    constructor(item: ItemJSON, private linkimpl: {new(link: LinkJSON): LinkImpl}) {
        super(item);
        this.href = item["href"];
        this.links = Link.parseArray<LinkImpl>(item["links"], this.linkimpl);
    }

    link(rel: string): string {
        return Link.findLink(this.links, rel);
    }

    static parseArray<LinkImpl extends Link>(items: ItemJSON[], linkimpl: {new(link: LinkJSON): LinkImpl}): Item<LinkImpl>[] {
        let item_arr: Item<LinkImpl>[] = [];
        if(items) {
            for (let i of items) {
                item_arr.push(new Item<LinkImpl>(i, linkimpl));
            }
        }
        return item_arr;
    }
}