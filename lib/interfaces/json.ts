import { Data } from './data';
import { Item } from './item';
import { Link } from './link';
import { Query } from './query';
import { Template } from './template';

export interface CollectionJSON {
    version: string;
    href: string;
    links?: Link[];
    items?: Item[];
    queries?: Query[];
    template?: Template;
    error?: Error;
}

export interface DataJSON {
    name: string;
    value?: string | number | boolean;
    prompt?: string;
}

export interface ErrorJSON {
    title?: string;
    code?: string;
    message?: string;
}

export interface ItemJSON {
    href: string;
    links?: Link[];
    data?: Data[];
}

export interface LinkJSON {
    href: string;
    rel: string;
    name?: string;
    prompt?: string;
    render?: string;
}

export interface QueryJSON {
    href: string;
    rel: string;
    name?: string;
    prompt?: string;
    data?: Data[];
}

export interface TemplateJSON {
    data: Data[];
}
