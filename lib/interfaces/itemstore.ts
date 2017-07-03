import {ItemJSON} from './json';
import {ItemBase} from '../models/item';

export interface ItemStoreAPI {
    add(item: ItemBase): void;
    first(): ItemBase;
    one(): ItemBase;
    all(): ItemBase[];
    json(): ItemJSON[];
}
