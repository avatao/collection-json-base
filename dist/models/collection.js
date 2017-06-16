"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const linkstore_1 = require("./linkstore");
const querystore_1 = require("./querystore");
class CollectionBase {
    constructor(collection) {
        this.version = collection.version || '1.0';
        this.href = collection.href;
        this.parseOptionalProperties(collection);
    }
    parseOptionalProperties(collection) {
        if (collection.links) {
            this.links = new linkstore_1.LinkStore();
            this.parseLinks(collection.links);
        }
        if (collection.items) {
            this.items = [];
            this.parseItems(collection.items);
        }
        if (collection.queries) {
            this.queries = new querystore_1.QueryStore();
            this.parseQueries(collection.queries);
        }
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