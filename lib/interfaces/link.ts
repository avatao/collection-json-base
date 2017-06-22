import {Observable} from 'rxjs/Observable';
import {Collection} from './collection';
import {LinkJSON} from './json';

export interface LinkAPI {
    follow(): Observable<Collection>;
    json(): LinkJSON
}

export interface Link extends LinkJSON, LinkAPI {}
