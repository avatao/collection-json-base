import {ItemJSON} from './json';
import {Item} from './item';

export interface ItemStoreAPI {
    add(item: Item): void;
    first(): Item;
    one(): Item;
    all(): Item[];
    json(): ItemJSON[];
}
