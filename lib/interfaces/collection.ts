import {ErrorBase, ItemStore, LinkBase, LinkStore, QueryBase, QueryStore, TemplateBase} from '../models';
import {WrappedCollectionJSON} from './json';

export interface CollectionData {
    version: string;
    href?: string;
}

export interface CollectionAPI {
    link(rel: string): LinkBase | undefined;
    query(rel: string): QueryBase | undefined;
    template(): TemplateBase | undefined;
    error(): ErrorBase | undefined;
    items(): ItemStore;
    hasItems(): boolean;
    links(): LinkStore;
    hasLinks(): boolean;
    queries(): QueryStore;
    hasQueries(): boolean;
    json(): WrappedCollectionJSON;
}

export interface Collection extends CollectionData, CollectionAPI {}
