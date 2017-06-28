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
describe('Template Validation extension check with arrays', function () {
    var dataJson = {
        name: 'Test',
    };
    describe('Regex matching', function () {
        var data = new MockData(dataJson);
        it('should pass the regex validation (values all start with hello)', function () {
            data.array = ['hello world!', 'hello bello', 'hello'];
            data.regexp = '^hello';
            chai_1.expect(function () {
                template_1.TemplateBase.templateValidationExtensionCheck(data);
            }).to.not.throw();
        });
        it('should pass the regex validation (values are all valid emails)', function () {
            data.array = ['valid@email.com', 'anothervalid@example.com', 'thisis@valid.hu'];
            data.regexp = '^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
                '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$';
            chai_1.expect(function () {
                template_1.TemplateBase.templateValidationExtensionCheck(data);
            }).to.not.throw();
        });
        it('should fail the regex validation (not all emails are valid)', function () {
            data.array = ['valid@email.com', 'invalid.example.com', 'thisis@valid.hu'];
            data.regexp = '^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
                '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$';
            chai_1.expect(function () {
                template_1.TemplateBase.templateValidationExtensionCheck(data);
            }).to.throw('The data with the name: \'Test\' has the array with values: \'valid@email.com,invalid.example.com,' +
                'thisis@valid.hu\'.\nThe value: \'invalid.example.com\' doesn\'t match the supplied regexp: \'^[a-zA-Z0-9.!#$%&\'*' +
                '+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$\'');
        });
        it('should fail the regex validation (not all values start with hello)', function () {
            data.array = ['nothello world!', 'this is not starting with hello'];
            data.regexp = '^hello';
            chai_1.expect(function () {
                template_1.TemplateBase.templateValidationExtensionCheck(data);
            }).to.throw('The data with the name: \'Test\' has the array with values: \'nothello world!,this is not starting with hello\'.' +
                '\nThe value: \'nothello world!\' doesn\'t match the supplied regexp: \'^hello\'');
        });
    });
    describe('Required value', function () {
        var data = new MockData(dataJson);
        it('should pass the required validation (array is supplied)', function () {
            data.array = ['hello world!', 'hello bello'];
            data.regexp = undefined;
            data.required = true;
            chai_1.expect(function () {
                template_1.TemplateBase.templateValidationExtensionCheck(data);
            }).to.not.throw();
        });
        it('should pass the required validation (value is not required)', function () {
            data.array = undefined;
            data.regexp = undefined;
            data.required = false;
            chai_1.expect(function () {
                template_1.TemplateBase.templateValidationExtensionCheck(data);
            }).to.not.throw();
        });
        it('should fail the required validation (value is not supplied but it is required)', function () {
            data.array = undefined;
            data.regexp = undefined;
            data.required = true;
            chai_1.expect(function () {
                template_1.TemplateBase.templateValidationExtensionCheck(data);
            }).to.throw('The data with the name: \'Test\' is required, but the value or array was not supplied.');
        });
    });
    describe('Required value and Regex matching together', function () {
        var data = new MockData(dataJson);
        it('should pass the required and regex validation (array is supplied, and matches the regex)', function () {
            data.array = ['hello world!', 'hello bello'];
            data.regexp = '^hello';
            data.required = true;
            chai_1.expect(function () {
                template_1.TemplateBase.templateValidationExtensionCheck(data);
            }).to.not.throw();
        });
        it('should pass the required and regex validation (array is not required)', function () {
            data.array = undefined;
            data.regexp = '^hello';
            data.required = false;
            chai_1.expect(function () {
                template_1.TemplateBase.templateValidationExtensionCheck(data);
            }).to.not.throw();
        });
        it('should fail the required and regex validation (value not required but supplied and fails regex)', function () {
            data.array = ['nothello', 'something'];
            data.regexp = '^hello';
            data.required = false;
            chai_1.expect(function () {
                template_1.TemplateBase.templateValidationExtensionCheck(data);
            }).to.throw('The data with the name: \'Test\' has the array with values: \'nothello,something\'.' +
                '\nThe value: \'nothello\' doesn\'t match the supplied regexp: \'^hello\'');
        });
    });
});
