import {expect} from 'chai';
import {DataBase} from '../../models/data';
import {DataJSON} from '../../interfaces';
import {TemplateBase} from '../../models';


class MockData extends DataBase {}

describe('Template Validation extension check with arrays', () => {

    const dataJson: DataJSON = {
        name: 'Test',
    };


    describe('Regex matching', () => {

        const data = new MockData(dataJson);

        it('should pass the regex validation (values all start with hello)', () => {
            data.array = ['hello world!', 'hello bello', 'hello'];
            data.regexp = '^hello';
            expect( () => {
                TemplateBase.templateValidationExtensionCheck(data);
            }).to.not.throw();
        });

        it('should pass the regex validation (values are all valid emails)', () => {
            data.array = ['valid@email.com', 'anothervalid@example.com', 'thisis@valid.hu'];
            data.regexp = '^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
                '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$';
            expect( () => {
                TemplateBase.templateValidationExtensionCheck(data);
            }).to.not.throw();
        });

        it('should fail the regex validation (not all emails are valid)', () => {
            data.array = ['valid@email.com', 'invalid.example.com', 'thisis@valid.hu'];
            data.regexp = '^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
                '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$';
            expect( () => {
                TemplateBase.templateValidationExtensionCheck(data);
            }).to.throw('The data with the name: \'Test\' has the array with values: \'valid@email.com,invalid.example.com,' +
                'thisis@valid.hu\'.\nThe value: \'invalid.example.com\' doesn\'t match the supplied regexp: \'^[a-zA-Z0-9.!#$%&\'*' +
                '+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$\'');
        });

        it('should fail the regex validation (not all values start with hello)', () => {
            data.array = ['nothello world!', 'this is not starting with hello'];
            data.regexp = '^hello';
            expect( () => {
                TemplateBase.templateValidationExtensionCheck(data);
            }).to.throw('The data with the name: \'Test\' has the array with values: \'nothello world!,this is not starting with hello\'.' +
                '\nThe value: \'nothello world!\' doesn\'t match the supplied regexp: \'^hello\'');
        });
    });

    describe('Required value', () => {

        const data = new MockData(dataJson);

        it('should pass the required validation (array is supplied)', () => {
            data.array = ['hello world!', 'hello bello'];
            data.regexp = undefined;
            data.required = true;
            expect( () => {
                TemplateBase.templateValidationExtensionCheck(data);
            }).to.not.throw();
        });

        it('should pass the required validation (value is not required)', () => {
            data.array = undefined;
            data.regexp = undefined;
            data.required = false;
            expect( () => {
                TemplateBase.templateValidationExtensionCheck(data);
            }).to.not.throw();
        });

        it('should fail the required validation (value is not supplied but it is required)', () => {
            data.array = undefined;
            data.regexp = undefined;
            data.required = true;
            expect( () => {
                TemplateBase.templateValidationExtensionCheck(data);
            }).to.throw('The data with the name: \'Test\' is required, but the value or array was not supplied.');
        });
    });

    describe('Required value and Regex matching together', () => {

        const data = new MockData(dataJson);

        it('should pass the required and regex validation (array is supplied, and matches the regex)', () => {
            data.array = ['hello world!', 'hello bello'];
            data.regexp = '^hello';
            data.required = true;
            expect( () => {
                TemplateBase.templateValidationExtensionCheck(data);
            }).to.not.throw();
        });

        it('should pass the required and regex validation (array is not required)', () => {
            data.array = undefined;
            data.regexp = '^hello';
            data.required = false;
            expect( () => {
                TemplateBase.templateValidationExtensionCheck(data);
            }).to.not.throw();
        });

        it('should fail the required and regex validation (value not required but supplied and fails regex)', () => {
            data.array = ['nothello', 'something'];
            data.regexp = '^hello';
            data.required = false;
            expect( () => {
                TemplateBase.templateValidationExtensionCheck(data);
            }).to.throw('The data with the name: \'Test\' has the array with values: \'nothello,something\'.' +
            '\nThe value: \'nothello\' doesn\'t match the supplied regexp: \'^hello\'');
        });
    });
});
