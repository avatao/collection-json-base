import {
    Collection,
    CollectionJSON,
    ErrorJSON,
    ItemJSON,
    LinkJSON,
    QueryJSON,
    TemplateJSON
} from '../interfaces';
import {LinkStore} from './linkstore';
import {QueryStore} from './querystore';
import {ItemStore} from './itemstore';
import {isUri} from 'valid-url';
import {LinkBase} from './link';
import {QueryBase} from './query';
import {ErrorBase} from './error';
import {TemplateBase} from './template';

export abstract class CollectionBase implements Collection {
    public version: string;
    public href?: string;
    public linkStore?: LinkStore;
    public itemStore?: ItemStore;
    public queryStore?: QueryStore;
    public template?: TemplateBase;
    public error?: ErrorBase;

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
        if (typeof collection.links !== 'undefined') {
            this.parseLinks(collection.links);
        }
        if (typeof collection.items !== 'undefined') {
            this.parseItems(collection.items);
        }
        if (typeof collection.queries !== 'undefined') {
            this.parseQueries(collection.queries);
        }
        if (typeof collection.template !== 'undefined') {
            this.parseTemplate(collection.template);
        }
        if (typeof collection.error !== 'undefined') {
            this.parseError(collection.error);
        }
    }

    protected abstract parseLinks(links: LinkJSON[]): void;
    protected abstract parseItems(items: ItemJSON[]): void;
    protected abstract parseQueries(queries: QueryJSON[]): void;
    protected abstract parseTemplate(template: TemplateJSON): void;
    protected abstract parseError(error: ErrorJSON): void;

    public link(rel: string): LinkBase | undefined {
        if (typeof this.linkStore !== 'undefined') {
            return this.linkStore.link(rel);
        }
    }

    public query(rel: string): QueryBase | undefined {
        if (typeof this.queryStore !== 'undefined') {
            return this.queryStore.query(rel);
        }
    }

    public items(): ItemStore | undefined {
        return this.itemStore
    }

    public json(): {collection: CollectionJSON} {

        const result: {collection: CollectionJSON} = {collection: {version: this.version, href: this.href}};

        if (typeof this.linkStore !== 'undefined') {
            result.collection.links = this.linkStore.json();
        }

        if (typeof this.itemStore !== 'undefined') {
            result.collection.items = [];
            for (const item of this.itemStore) {
                result.collection.items.push(item.json())
            }
        }

        if (typeof this.queryStore !== 'undefined') {
            result.collection.queries = this.queryStore.json();
        }

        if (typeof this.template !== 'undefined') {
            result.collection.template = this.template.json();
        }

        if (typeof this.error !== 'undefined') {
            result.collection.error = this.error.json();
        }

        return result;
    }
}
