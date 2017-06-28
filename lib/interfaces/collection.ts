import {ItemStore, LinkStore, QueryStore} from '../models';
import {CollectionError} from './error';
import {Link} from './link';
import {Template} from './template';
import {Query} from './query';
import {CollectionJSON} from './json';

export interface CollectionData {
    version: string;
    href?: string;
    linkStore?: LinkStore;
    itemStore?: ItemStore;
    queryStore?: QueryStore;
    template?: Template;
    error?: CollectionError;
}

export interface CollectionAPI {
    link(rel: string): Link;
    query(rel: string): Query;
    items(): ItemStore;
    json(): {collection: CollectionJSON}
}

export interface Collection extends CollectionData, CollectionAPI {}
