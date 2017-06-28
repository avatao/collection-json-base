import {
    Collection,
    CollectionError,
    CollectionJSON,
    ErrorJSON,
    ItemJSON,
    Link,
    LinkJSON,
    Query,
    QueryJSON,
    Template,
    TemplateJSON
} from '../interfaces';
import {LinkStore} from './linkstore';
import {QueryStore} from './querystore';
import {ItemStore} from './itemstore';
import {isUri} from 'valid-url';

export abstract class CollectionBase implements Collection {
    public version: string;
    public href?: string;
    public linkStore?: LinkStore;
    public itemStore?: ItemStore;
    public queryStore?: QueryStore;
    public template?: Template;
    public error?: CollectionError;

    constructor(collection: CollectionJSON) {
        this.version = collection.version || '1.0';

        if (typeof collection.href !== 'undefined') {
            if (!isUri(collection.href)) {
                throw new Error('The supplied href must be a valid uri!')
            } else {
                this.href = collection.href;
            }
        }

        this.parseOptionalProperties(collection);
    }

    private parseOptionalProperties(collection: CollectionJSON) {
        if (collection.links) {
            this.parseLinks(collection.links);
        }
        if (collection.items) {
            this.parseItems(collection.items);
        }
        if (collection.queries) {
            this.parseQueries(collection.queries);
        }
        if (collection.template) {
            this.parseTemplate(collection.template);
        }
        if (collection.error) {
            this.parseError(collection.error);
        }
    }

    protected abstract parseLinks(links: LinkJSON[]): void;
    protected abstract parseItems(items: ItemJSON[]): void;
    protected abstract parseQueries(queries: QueryJSON[]): void;
    protected abstract parseTemplate(template: TemplateJSON): void;
    protected abstract parseError(error: ErrorJSON): void;

    public link(rel: string): Link {
        if (typeof this.linkStore !== 'undefined') {
            return this.linkStore.link(rel);
        } else {
            throw new Error('There are no links stored in this Collection!');
        }
    }

    public query(rel: string): Query {
        if (typeof this.queryStore !== 'undefined') {
            return this.queryStore.query(rel);
        } else {
            throw new Error('There are no queries stored in this Collection!');
        }
    }

    public items(): ItemStore {
        if (typeof this.itemStore !== 'undefined') {
            return this.itemStore;
        } else {
            throw new Error('There are no items stored in this Collection!');
        }
    }

    public json(): {collection: CollectionJSON} {

        const result: {collection: CollectionJSON} = {collection: {version: this.version, href: this.href}};

        if (this.linkStore) {
            result.collection.links = this.linkStore.json();
        }

        if (this.itemStore) {
            result.collection.items = [];
            for (const item of this.itemStore) {
                result.collection.items.push(item.json())
            }
        }

        if (this.queryStore) {
            result.collection.queries = this.queryStore.json();
        }

        if (this.template) {
            result.collection.template = this.template.json();
        }

        if (this.error) {
            result.collection.error = this.error.json();
        }

        return result;
    }
}
