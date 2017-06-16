import { Collection, CollectionError, CollectionJSON, ErrorJSON, Item, ItemJSON, Link, LinkJSON, QueryJSON, Template, TemplateJSON } from '../interfaces';
import { LinkStore } from './linkstore';
import { QueryStore } from './querystore';
export declare abstract class CollectionBase implements Collection {
    version: string;
    href?: string;
    links?: LinkStore;
    items?: Item[];
    queries?: QueryStore;
    template?: Template;
    error?: CollectionError;
    constructor(collection: CollectionJSON);
    private parseOptionalProperties(collection);
    protected abstract parseLinks(links: LinkJSON[]): void;
    protected abstract parseItems(items: ItemJSON[]): void;
    protected abstract parseQueries(queries: QueryJSON[]): void;
    protected abstract parseTemplate(template: TemplateJSON): void;
    protected abstract parseError(error: ErrorJSON): void;
    link(rel: string): Link;
}
