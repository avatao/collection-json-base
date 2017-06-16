"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CollectionBase {
    constructor(collection) {
        this.version = collection.version || '1.0';
        this.href = collection.href;
        this.parseOptionalProperties(collection);
    }
    parseOptionalProperties(collection) {
        if (collection.links)
            this.parseLinks(collection.links);
        if (collection.items)
            this.parseItems(collection.items);
        if (collection.queries)
            this.parseQueries(collection.queries);
        if (collection.template)
            this.parseTemplate(collection.template);
        if (collection.error)
            this.parseError(collection.error);
    }
    link(rel) {
        if (typeof this.links !== 'undefined')
            return this.links.link(rel);
        else
            throw new Error('There are no links stored in this Collection!');
    }
}
exports.CollectionBase = CollectionBase;
//# sourceMappingURL=collection.js.map