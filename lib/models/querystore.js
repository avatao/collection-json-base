"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueryStore = (function () {
    function QueryStore() {
        this.queries = new Map();
    }
    QueryStore.prototype.add = function (query) {
        this.queries.set(query.rel, query);
    };
    QueryStore.prototype.query = function (rel) {
        var query = this.queries.get(rel);
        if (typeof query !== 'undefined') {
            return query;
        }
        else {
            throw new Error('Key not found');
        }
    };
    QueryStore.prototype.json = function () {
        var result = [];
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var query = _a[_i];
            result.push(query.json());
        }
        return result;
    };
    QueryStore.prototype[Symbol.iterator] = function () {
        return this.queries.values();
    };
    return QueryStore;
}());
exports.QueryStore = QueryStore;
