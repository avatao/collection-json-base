"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var valid_url_1 = require("valid-url");
var CollectionBase = (function () {
    function CollectionBase(collection) {
        this.version = collection.version || '1.0';
        if (typeof collection.href !== 'undefined') {
            if (!valid_url_1.isUri(collection.href)) {
                throw new Error('The supplied href must be a valid uri!');
            }
            else {
                this.href = collection.href;
            }
        }
        this.parseOptionalProperties(collection);
    }
    CollectionBase.prototype.parseOptionalProperties = function (collection) {
        if (collection.links) {
            this.parseLinks(collection.links);
        }
        if (collection.items) {
            this.parseItems(collection.items);
        }
        if (collection.queries) {
            this.parseQueries(collection.queries);
        }
        if (collection.template) {
            this.parseTemplate(collection.template);
        }
        if (collection.error) {
            this.parseError(collection.error);
        }
    };
    CollectionBase.prototype.link = function (rel) {
        if (typeof this.linkStore !== 'undefined') {
            return this.linkStore.link(rel);
        }
        else {
            throw new Error('There are no links stored in this Collection!');
        }
    };
    CollectionBase.prototype.query = function (rel) {
        if (typeof this.queryStore !== 'undefined') {
            return this.queryStore.query(rel);
        }
        else {
            throw new Error('There are no queries stored in this Collection!');
        }
    };
    CollectionBase.prototype.items = function () {
        if (typeof this.itemStore !== 'undefined') {
            return this.itemStore.items();
        }
        else {
            throw new Error('There are no items stored in this Collection!');
        }
    };
    CollectionBase.prototype.json = function () {
        var result = { collection: { version: this.version, href: this.href } };
        if (this.linkStore) {
            result.collection.links = this.linkStore.json();
        }
        if (this.itemStore) {
            result.collection.items = [];
            for (var _i = 0, _a = this.itemStore; _i < _a.length; _i++) {
                var item = _a[_i];
                result.collection.items.push(item.json());
            }
        }
        if (this.queryStore) {
            result.collection.queries = this.queryStore.json();
        }
        if (this.template) {
            result.collection.template = this.template.json();
        }
        if (this.error) {
            result.collection.error = this.error.json();
        }
        return result;
    };
    return CollectionBase;
}());
exports.CollectionBase = CollectionBase;
