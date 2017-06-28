"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ItemBase = (function () {
    function ItemBase(item) {
        this.href = item.href;
        if (item.links) {
            this.parseLinks(item.links);
        }
        if (item.data) {
            this.parseData(item.data);
        }
    }
    ItemBase.prototype.link = function (rel) {
        if (typeof this.linkStore !== 'undefined') {
            return this.linkStore.link(rel);
        }
        else {
            throw new Error('There are no links stored in this Item!');
        }
    };
    ItemBase.prototype.data = function (name) {
        if (typeof this.dataStore !== 'undefined') {
            return this.dataStore.data(name);
        }
        else {
            throw new Error("This item with the href: " + this.href + " has no data array!");
        }
    };
    ItemBase.prototype.json = function () {
        var result = {
            href: this.href
        };
        if (this.linkStore) {
            result.links = this.linkStore.json();
        }
        if (this.dataStore) {
            result.data = this.dataStore.json();
        }
        return result;
    };
    return ItemBase;
}());
exports.ItemBase = ItemBase;
