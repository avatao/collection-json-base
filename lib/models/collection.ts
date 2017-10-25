import {
    Collection,
    CollectionJSON,
    WrappedCollectionJSON,
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
    protected _linkStore?: LinkStore;
    protected _itemStore?: ItemStore;
    protected _queryStore?: QueryStore;
    protected _template?: TemplateBase;
    protected _error?: ErrorBase;

    constructor(collection: CollectionJSON | WrappedCollectionJSON) {

        let parsedCollection: CollectionJSON;

        if (typeof (collection as WrappedCollectionJSON).collection !== 'undefined') {
            parsedCollection = (collection as WrappedCollectionJSON).collection as CollectionJSON;
        } else {
            parsedCollection = collection as CollectionJSON;
        }

        this.version = parsedCollection.version || '1.0';

        if (typeof parsedCollection.href !== 'undefined') {
            if (!isUri(parsedCollection.href)) {
                throw new Error('The supplied href must be a valid uri!');
            } else {
                this.href = parsedCollection.href;
            }
        }

        this.parseOptionalProperties(parsedCollection);
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
    protected abstract parseTemplate(_template: TemplateJSON): void;
    protected abstract parseError(_error: ErrorJSON): void;

    public link(rel: string): LinkBase | undefined {
        if (typeof this._linkStore !== 'undefined') {
            return this._linkStore.link(rel);
        }
    }

    public query(rel: string): QueryBase | undefined {
        if (typeof this._queryStore !== 'undefined') {
            return this._queryStore.query(rel);
        }
    }

    public template(): TemplateBase | undefined {
        return this._template;
    }

    public error(): ErrorBase | undefined {
        return this._error;
    }


    public items(): ItemStore {
        if (typeof this._itemStore !== 'undefined') {
            return this._itemStore;
        } else {
            throw new Error('There are no items on this Collection');
        }
    }

    public hasItems(): boolean {
        return typeof this._itemStore !== 'undefined';
    }

    public queries(): QueryStore {
        if (typeof this._queryStore !== 'undefined') {
            return this._queryStore;
        } else {
            throw new Error('There are no queries on this Collection');
        }
    }

    public hasQueries(): boolean {
        return typeof this._queryStore !== 'undefined';
    }

    public links(): LinkStore {
        if (typeof this._linkStore !== 'undefined') {
            return this._linkStore;
        } else {
            throw new Error('There are no links on this Collection');
        }
    }

    public hasLinks(): boolean {
        return typeof this._linkStore !== 'undefined';
    }

    public json(): WrappedCollectionJSON {

        const result: WrappedCollectionJSON = {collection: {version: this.version, href: this.href}};

        if (typeof this._linkStore !== 'undefined') {
            result.collection.links = this._linkStore.json();
        }

        if (typeof this._itemStore !== 'undefined') {
            result.collection.items = [];
            for (const item of this._itemStore) {
                result.collection.items.push(item.json());
            }
        }

        if (typeof this._queryStore !== 'undefined') {
            result.collection.queries = this._queryStore.json();
        }

        if (typeof this._template !== 'undefined') {
            result.collection.template = this._template.json();
        }

        if (typeof this._error !== 'undefined') {
            result.collection.error = this._error.json();
        }

        return result;
    }
}
