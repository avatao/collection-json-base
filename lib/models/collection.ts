import { Error, ErrorJSON } from './error';
import { Item, ItemJSON } from './item';
import { Link, LinkJSON } from './link';
import { LinkStore } from './linkstore';
import { QueryStore } from './querystore';
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

export interface CollectionData {
    version: string;
    href: string;
    links: LinkStore;
    items: Item[];
    queries: QueryStore;
    template: Template;
    error: Error;
}

export interface CollectionAPI {
    parse(collection: CollectionJSON): void;
    link(rel: string): Link;
}

export interface Collection extends CollectionData, CollectionAPI {}

export abstract class CollectionBase implements Collection {
    public version: string;
    public href: string;
    public links: LinkStore;
    public items: Item[];
    public queries: QueryStore;
    public template: Template;
    public error: Error;

    protected abstract load(url: string): void;
    protected abstract parseLinks(links: LinkJSON[]): Link[];
    protected abstract parseItems(items: ItemJSON[]): Item[];
    protected abstract parseQueries(queries: QueryJSON[]): Query[];
    protected abstract parseTemplate(template: TemplateJSON): Template;
    protected abstract parseError(error: ErrorJSON): Error;

    public abstract parse(collection: CollectionJSON): void;

    public link(rel: string): Link {
        return this.links.link(rel);
    }
}
