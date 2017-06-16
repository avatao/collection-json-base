import {Collection} from './collection';
import {LinkJSON} from './json';

export interface LinkAPI {
    follow(): Promise<Collection>;
}

export interface Link extends LinkJSON, LinkAPI {}
