"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LinkStore {
    constructor() {
        this.links = new Map();
    }
    add(link) {
        this.links.set(link.rel, link);
    }
    link(rel) {
        const link = this.links.get(rel);
        if (typeof link !== 'undefined')
            return link;
        else
            throw new Error('Key not found');
    }
}
exports.LinkStore = LinkStore;
//# sourceMappingURL=linkstore.js.map