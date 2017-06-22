import {LinkStore, QueryStore} from '../models';
import {CollectionError} from './error';
import {Item} from './item';
import {Link} from './link';
import {Template} from './template';
import {Query} from './query';
import {CollectionJSON} from './json';

export interface CollectionData {
    version: string;
    href?: string;
    links?: LinkStore;
    items?: Item[];
    queries?: QueryStore;
    template?: Template;
    error?: CollectionError;
}

export interface CollectionAPI {
    link(rel: string): Link;
    query(rel: string): Query;
    json(): {collection: CollectionJSON}
}

export interface Collection extends CollectionData, CollectionAPI {}
