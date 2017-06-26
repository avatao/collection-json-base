import {expect} from 'chai';
import {DataJSON, ValidationJSON} from '../lib/interfaces/json';
import {DataBase} from '../lib/models/data';
import {TemplateBase} from '../lib/models/template';


class MockData extends DataBase {}

describe('Template validation check', () => {
    describe('Validations Array extension', () => {
        describe('Presence', () => {

            const validations: ValidationJSON[] = [
                {
                    name: 'presence',
                    prompt: 'Test must exist',
                    message: 'Test is undefined, it is required!'
                }
            ];

            const dataJson: DataJSON = {
                name: 'Test',
                value: undefined,
                validations: validations
            };

            it('should fail the presence test', () => {
                const data = new MockData(dataJson);
                expect(() => {
                    TemplateBase.validationsArrayExtensionCheck(data);
                }).to.throw(Error, 'Test is undefined, it is required!');
            });

            it('should pass the presence test', () => {
                dataJson.value = 'something';
                const data = new MockData(dataJson);
                expect(() => {
                    TemplateBase.validationsArrayExtensionCheck(data);
                }).to.not.throw();
            });
        });

        describe('Inclusion', () => {

            const validations: ValidationJSON[] = [
                {
                    name: 'inclusion',
                    prompt: 'Value must be hello or world',
                    arguments: [
                        {
                            name: 'option',
                            value: 'hello'
                        },
                        {
                            name: 'option',
                            value: 'world'
                        }
                    ],
                    message: 'The value must be either hello or world!'
                }
            ];
            const dataJson: DataJSON = {
                name: 'Test',
                value: 'nothello',
                validations: validations
            };

            it('should fail the inclusion test', () => {
                const data = new MockData(dataJson);
                expect(() => {
                    TemplateBase.validationsArrayExtensionCheck(data);
                }).to.throw(Error, 'The value must be either hello or world!');
            });

            it('should pass the inclusion test', () => {
                dataJson.value = 'hello';
                const data = new MockData(dataJson);
                expect(() => {
                    TemplateBase.validationsArrayExtensionCheck(data);
                }).to.not.throw();
            });
        });
    });
});
