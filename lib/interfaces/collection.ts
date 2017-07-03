import {ItemStore, LinkStore, QueryStore} from '../models';
import {CollectionJSON} from './json';
import {LinkBase} from '../models/link';
import {QueryBase} from '../models/query';
import {TemplateBase} from '../models/template';
import {ErrorBase} from '../models/error';

export interface CollectionData {
    version: string;
    href?: string;
    linkStore?: LinkStore;
    itemStore?: ItemStore;
    queryStore?: QueryStore;
    template?: TemplateBase;
    error?: ErrorBase;
}

export interface CollectionAPI {
    link(rel: string): LinkBase;
    query(rel: string): QueryBase;
    items(): ItemStore;
    json(): {collection: CollectionJSON}
}

export interface Collection extends CollectionData, CollectionAPI {}
