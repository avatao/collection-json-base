import {LinkJSON} from './json';
import {LinkBase} from '../models';

export interface LinkStoreAPI {
    add(link: LinkBase): void;
    link(rel: string): LinkBase | undefined;
    json(): LinkJSON[];
}
