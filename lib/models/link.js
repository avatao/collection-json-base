"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LinkBase = (function () {
    function LinkBase(link) {
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
    LinkBase.prototype.json = function () {
        var result = {
            href: this.href,
            rel: this.rel
        };
        if (this.name) {
            result.name = this.name;
        }
        if (this.prompt) {
            result.prompt = this.prompt;
        }
        if (this.render) {
            result.render = this.render;
        }
        return result;
    };
    return LinkBase;
}());
exports.LinkBase = LinkBase;
