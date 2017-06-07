import { Error, ErrorJSON } from './error';
import { Item, ItemJSON } from './item';
import { Link, LinkBase, LinkJSON } from './link';
import { Query, QueryJSON } from './query';
import { Template, TemplateJSON } from './template';

export interface CollectionJSON {
    version: string;
    href: string;
    links: Link[];
    items: Item[];
    queries: Query[];
    template: Template;
    error: Error;
}

export interface CollectionAPI {
    parse(json: string): void;
    link(rel: string): string;
}

export interface Collection extends CollectionJSON, CollectionAPI {}

export abstract class CollectionBase implements Collection {
    public version: string;
    public href: string;
    public links: Link[];
    public items: Item[];
    public queries: Query[];
    public template: Template;
    public error: Error;

    protected abstract load(url: string): void;
    protected abstract parseLinks(links: LinkJSON[]): Link[];
    protected abstract parseItems(items: ItemJSON[]): Item[];
    protected abstract parseQueries(queries: QueryJSON[]): Query[];
    protected abstract parseTemplate(template: TemplateJSON): Template;
    protected abstract parseError(error: ErrorJSON): Error;

    public abstract parse(jsontext: string): void;

    public link(rel: string): string {
        return LinkBase.findLink(this.links, rel);
    }
}
