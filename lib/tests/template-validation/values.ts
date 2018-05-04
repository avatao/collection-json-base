import {expect} from 'chai';
import {DataBase} from '../../models/data';
import {DataJSON} from '../../interfaces';
import {TemplateBase} from '../../models';


class MockData extends DataBase {}

describe('Template Validation extension check with values', () => {

    const dataJson: DataJSON = {
        name: 'Test',
    };

    describe('Regex matching', () => {
        const data = new MockData(dataJson);

        it('should pass the regex validation (starts with hello)', () => {
            data.value = 'hello world!';
            data.regexp = '^hello';
            expect( () => {
                TemplateBase.templateValidationExtensionCheck(data);
            }).to.not.throw();
        });

        it('should pass the regex validation (valid email)', () => {
            data.value = 'valid@email.com';
            data.regexp = '^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
                '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$';
            expect( () => {
                TemplateBase.templateValidationExtensionCheck(data);
            }).to.not.throw();
        });

        it('should fail the regex validation (invalid email)', () => {
            data.value = 'invalid.email.com';
            data.regexp = '^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
                '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$';
            expect( () => {
                TemplateBase.templateValidationExtensionCheck(data);
            }).to.throw('The data with the name: \'Test\' has the value: \'invalid.email.com\'.' +
                '\nThis doesn\'t match the supplied regexp: \'^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-' +
                'Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$\'');
        });

        it('should fail the regex validation (doesn\'t start with hello)', () => {
            data.value = 'nothello world!';
            data.regexp = '^hello';
            expect( () => {
                TemplateBase.templateValidationExtensionCheck(data);
            }).to.throw('The data with the name: \'Test\' has the value: \'nothello world!\'.' +
                '\nThis doesn\'t match the supplied regexp: \'^hello\'');
        });
    });

    describe('Required value', () => {
        const data = new MockData(dataJson);

        it('should pass the required validation (value is supplied)', () => {
            data.value = 'hello world!';
            data.regexp = undefined;
            data.required = true;
            expect( () => {
                TemplateBase.templateValidationExtensionCheck(data);
            }).to.not.throw();
        });

        it('should pass the required validation (value is not required)', () => {
            data.value = undefined;
            data.regexp = undefined;
            data.required = false;
            expect( () => {
                TemplateBase.templateValidationExtensionCheck(data);
            }).to.not.throw();
        });

        it('should fail the required validation (value is not supplied but it is required)', () => {
            data.value = undefined;
            data.regexp = undefined;
            data.required = true;
            expect( () => {
                TemplateBase.templateValidationExtensionCheck(data);
            }).to.throw('The data with the name: \'Test\' is required, but the value or array was not supplied.');
        });
    });

    describe('Required value and Regex matching together', () => {
        const data = new MockData(dataJson);

        it('should pass the required and regex validation (value is supplied, and matches the regex)', () => {
            data.value = 'hello world!';
            data.regexp = '^hello';
            data.required = true;
            expect( () => {
                TemplateBase.templateValidationExtensionCheck(data);
            }).to.not.throw();
        });

        it('should pass the required and regex validation (value is not required)', () => {
            data.value = undefined;
            data.regexp = '^hello';
            data.required = false;
            expect( () => {
                TemplateBase.templateValidationExtensionCheck(data);
            }).to.not.throw();
        });

        it('should fail the required and regex validation (value not required but supplied and fails regex)', () => {
            data.value = 'nothello';
            data.regexp = '^hello';
            data.required = false;
            expect( () => {
                TemplateBase.templateValidationExtensionCheck(data);
            }).to.throw('The data with the name: \'Test\' has the value: \'nothello\'.' +
            '\nThis doesn\'t match the supplied regexp: \'^hello\'');
        });
    });
});
