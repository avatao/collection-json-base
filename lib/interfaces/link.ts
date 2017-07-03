import {Observable} from 'rxjs/Observable';
import {LinkJSON} from './json';
import {CollectionBase} from '../models/collection';

export interface LinkAPI {
    follow(): Observable<CollectionBase>;
    json(): LinkJSON
}

export interface Link extends LinkJSON, LinkAPI {}
