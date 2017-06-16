"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const datastore_1 = require("./datastore");
const linkstore_1 = require("./linkstore");
class ItemBase {
    constructor(item) {
        this.href = item.href;
        if (item.links) {
            this.links = new linkstore_1.LinkStore();
            this.parseLinks(item.links);
        }
        this.dataStore = item.data && new datastore_1.DataStore(item.data);
    }
    link(rel) {
        if (typeof this.links !== 'undefined')
            return this.links.link(rel);
        else
            throw new Error('There are no links stored in this Item!');
    }
}
exports.ItemBase = ItemBase;
//# sourceMappingURL=item.js.map