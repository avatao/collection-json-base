import {Observable} from 'rxjs/Observable';
import {Collection, Link, LinkJSON} from '../interfaces';

export abstract class LinkBase implements Link {
    public href: string;
    public rel: string;
    public name?: string;
    public prompt?: string;
    public render?: string;

    public abstract follow(): Observable<Collection>;

    constructor(link: LinkJSON) {
        this.href = link.href;
        this.rel = link.rel;

        if (link.name) {
            this.name = link.name;
        }

        if (link.prompt) {
            this.prompt = link.prompt;
        }

        if (link.render) {
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
