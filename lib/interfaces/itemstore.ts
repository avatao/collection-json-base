import {ItemJSON} from './json';
import {ItemBase} from '../models/item';

export interface ItemStoreAPI {
    add(item: ItemBase): void;
    first(): ItemBase | undefined;
    one(): ItemBase;
    all(): ItemBase[];
    json(): ItemJSON[];
}
