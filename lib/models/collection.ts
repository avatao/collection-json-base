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
    public href?: string;
    public links?: LinkStore;
    public items?: Item[];
    public queries?: QueryStore;
    public template?: Template;
    public error?: Error;

    constructor(collection: CollectionJSON) {
        this.version = collection.version || '1.0';
        this.href = collection.href;
        this.parseOptionalProperties(collection);
    }

    private parseOptionalProperties(collection: CollectionJSON) {
        if (collection.links) {
            this.links = new LinkStore();
            this.parseLinks(collection.links);
        }
        if (collection.items) {
            this.items = [];
            this.parseItems(collection.items);
        }
        if (collection.queries) {
            this.queries = new QueryStore();
            this.parseQueries(collection.queries);
        }
        if (collection.template)
            this.parseTemplate(collection.template);
        if (collection.error)
            this.parseError(collection.error);
    }

    protected abstract parseLinks(links: LinkJSON[]): void;
    protected abstract parseItems(items: ItemJSON[]): void;
    protected abstract parseQueries(queries: QueryJSON[]): void;
    protected abstract parseTemplate(template: TemplateJSON): void;
    protected abstract parseError(error: ErrorJSON): void;

    public link(rel: string): Link {
        if (typeof this.links !== 'undefined')
            return this.links.link(rel);
        else
            throw new Error('There are no links stored in this Collection!');
    }
}
