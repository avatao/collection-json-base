import { LinkStore } from '../models/linkstore';
import { QueryStore } from '../models/querystore';
import { Item } from './item';
import { CollectionJSON } from './json';
import { Link } from './link';
import { Template } from './template';

export interface CollectionData {
    version: string;
    href?: string;
    links?: LinkStore;
    items?: Item[];
    queries?: QueryStore;
    template?: Template;
    error?: Error;
}

export interface CollectionAPI {
    link(rel: string): Link;
}

export interface Collection extends CollectionData, CollectionAPI {}
