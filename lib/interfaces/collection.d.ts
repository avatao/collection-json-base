import { LinkStore, QueryStore } from '../models';
import { CollectionError } from './error';
import { Item } from './item';
import { Link } from './link';
import { Template } from './template';
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
}
export interface Collection extends CollectionData, CollectionAPI {
}
