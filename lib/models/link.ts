import {Observable} from 'rxjs/Observable';
import {Link, LinkJSON} from '../interfaces';
import {CollectionBase} from './collection';

export abstract class LinkBase implements Link {
    public href: string;
    public rel: string;
    public name?: string;
    public prompt?: string;
    public render?: string;

    public abstract follow(params?: any): Observable<CollectionBase>;

    constructor(link: LinkJSON) {
        this.href = link.href;
        this.rel = link.rel;

        if (typeof link.name !== 'undefined') {
            this.name = link.name;
        }

        if (typeof link.prompt !== 'undefined') {
            this.prompt = link.prompt;
        }

        if (typeof link.render !== 'undefined') {
            this.render = link.render;
        }
    }

    public json(): LinkJSON {

        const result: LinkJSON = {
            href: this.href,
            rel: this.rel
        };

        if (typeof this.name !== 'undefined') {
            result.name = this.name;
        }

        if (typeof this.prompt !== 'undefined') {
            result.prompt = this.prompt;
        }

        if (typeof this.render !== 'undefined') {
            result.render = this.render;
        }

        return result;
    }

}
