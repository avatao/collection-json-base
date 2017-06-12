import { Collection } from '../interfaces/collection';
import { Item } from '../interfaces/item';
import { CollectionJSON, ErrorJSON, ItemJSON, LinkJSON, QueryJSON, TemplateJSON } from '../interfaces/json';
import { Link } from '../interfaces/link';
import { Query } from '../interfaces/query';
import { Template } from '../interfaces/template';
import { LinkStore } from './linkstore';
import { QueryStore } from './querystore';

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
