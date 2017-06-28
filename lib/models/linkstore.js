"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LinkStore = (function () {
    function LinkStore() {
        this.links = new Map();
    }
    LinkStore.prototype.add = function (link) {
        this.links.set(link.rel, link);
    };
    LinkStore.prototype.link = function (rel) {
        var link = this.links.get(rel);
        if (typeof link !== 'undefined') {
            return link;
        }
        else {
            throw new Error('Key not found');
        }
    };
    LinkStore.prototype.json = function () {
        var result = [];
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var link = _a[_i];
            result.push(link.json());
        }
        return result;
    };
    LinkStore.prototype[Symbol.iterator] = function () {
        return this.links.values();
    };
    return LinkStore;
}());
exports.LinkStore = LinkStore;
