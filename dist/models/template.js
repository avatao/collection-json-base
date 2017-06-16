"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const datastore_1 = require("./datastore");
class TemplateBase {
    constructor(template) {
        this.dataStore = new datastore_1.DataStore(template.data);
    }
}
exports.TemplateBase = TemplateBase;
//# sourceMappingURL=template.js.map