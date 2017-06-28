"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var data_1 = require("../../models/data");
var template_1 = require("../../models/template");
var MockData = (function (_super) {
    __extends(MockData, _super);
    function MockData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MockData;
}(data_1.DataBase));
describe('Template Validation extension check with values', function () {
    var dataJson = {
        name: 'Test',
    };
    describe('Regex matching', function () {
        var data = new MockData(dataJson);
        it('should pass the regex validation (starts with hello)', function () {
            data.value = 'hello world!';
            data.regexp = '^hello';
            chai_1.expect(function () {
                template_1.TemplateBase.templateValidationExtensionCheck(data);
            }).to.not.throw();
        });
        it('should pass the regex validation (valid email)', function () {
            data.value = 'valid@email.com';
            data.regexp = '^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
                '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$';
            chai_1.expect(function () {
                template_1.TemplateBase.templateValidationExtensionCheck(data);
            }).to.not.throw();
        });
        it('should fail the regex validation (invalid email)', function () {
            data.value = 'invalid.email.com';
            data.regexp = '^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
                '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$';
            chai_1.expect(function () {
                template_1.TemplateBase.templateValidationExtensionCheck(data);
            }).to.throw('The data with the name: \'Test\' has the value: \'invalid.email.com\'.' +
                '\nThis doesn\'t match the supplied regexp: \'^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-' +
                'Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$\'');
        });
        it('should fail the regex validation (doesn\'t start with hello)', function () {
            data.value = 'nothello world!';
            data.regexp = '^hello';
            chai_1.expect(function () {
                template_1.TemplateBase.templateValidationExtensionCheck(data);
            }).to.throw('The data with the name: \'Test\' has the value: \'nothello world!\'.' +
                '\nThis doesn\'t match the supplied regexp: \'^hello\'');
        });
    });
    describe('Required value', function () {
        var data = new MockData(dataJson);
        it('should pass the required validation (value is supplied)', function () {
            data.value = 'hello world!';
            data.regexp = undefined;
            data.required = true;
            chai_1.expect(function () {
                template_1.TemplateBase.templateValidationExtensionCheck(data);
            }).to.not.throw();
        });
        it('should pass the required validation (value is not required)', function () {
            data.value = undefined;
            data.regexp = undefined;
            data.required = false;
            chai_1.expect(function () {
                template_1.TemplateBase.templateValidationExtensionCheck(data);
            }).to.not.throw();
        });
        it('should fail the required validation (value is not supplied but it is required)', function () {
            data.value = undefined;
            data.regexp = undefined;
            data.required = true;
            chai_1.expect(function () {
                template_1.TemplateBase.templateValidationExtensionCheck(data);
            }).to.throw('The data with the name: \'Test\' is required, but the value or array was not supplied.');
        });
    });
    describe('Required value and Regex matching together', function () {
        var data = new MockData(dataJson);
        it('should pass the required and regex validation (value is supplied, and matches the regex)', function () {
            data.value = 'hello world!';
            data.regexp = '^hello';
            data.required = true;
            chai_1.expect(function () {
                template_1.TemplateBase.templateValidationExtensionCheck(data);
            }).to.not.throw();
        });
        it('should pass the required and regex validation (value is not required)', function () {
            data.value = undefined;
            data.regexp = '^hello';
            data.required = false;
            chai_1.expect(function () {
                template_1.TemplateBase.templateValidationExtensionCheck(data);
            }).to.not.throw();
        });
        it('should fail the required and regex validation (value not required but supplied and fails regex)', function () {
            data.value = 'nothello';
            data.regexp = '^hello';
            data.required = false;
            chai_1.expect(function () {
                template_1.TemplateBase.templateValidationExtensionCheck(data);
            }).to.throw('The data with the name: \'Test\' has the value: \'nothello\'.' +
                '\nThis doesn\'t match the supplied regexp: \'^hello\'');
        });
    });
});
