import {ItemJSON} from './json';
import {Item} from './item';

export interface ItemStoreAPI {
    add(item: Item): void;
    first(): Item;
    one(): Item;
    items(): Item[];
    json(): ItemJSON[];
}
