"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueryBase = (function () {
    function QueryBase(query) {
        this.href = query.href;
        this.rel = query.rel;
        if (query.name) {
            this.name = query.name;
        }
        if (query.prompt) {
            this.prompt = query.prompt;
        }
        if (query.data) {
            this.parseData(query.data);
        }
    }
    QueryBase.prototype.json = function () {
        var result = { href: this.href, rel: this.rel };
        if (this.name) {
            result.name = this.name;
        }
        if (this.prompt) {
            result.prompt = this.prompt;
        }
        if (this.dataStore) {
            result.data = this.dataStore.json();
        }
        return result;
    };
    return QueryBase;
}());
exports.QueryBase = QueryBase;
