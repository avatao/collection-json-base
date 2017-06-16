import { Collection } from '../interfaces/collection';
import { Item } from '../interfaces/item';
import { CollectionJSON, ErrorJSON, ItemJSON, LinkJSON, QueryJSON, TemplateJSON } from '../interfaces/json';
import { Link } from '../interfaces/link';
import { Template } from '../interfaces/template';
import { LinkStore } from './linkstore';
import { QueryStore } from './querystore';
export declare abstract class CollectionBase implements Collection {
    version: string;
    href?: string;
    links?: LinkStore;
    items?: Item[];
    queries?: QueryStore;
    template?: Template;
    error?: Error;
    constructor(collection: CollectionJSON);
    private parseOptionalProperties(collection);
    protected abstract parseLinks(links: LinkJSON[]): void;
    protected abstract parseItems(items: ItemJSON[]): void;
    protected abstract parseQueries(queries: QueryJSON[]): void;
    protected abstract parseTemplate(template: TemplateJSON): void;
    protected abstract parseError(error: ErrorJSON): void;
    link(rel: string): Link;
}
