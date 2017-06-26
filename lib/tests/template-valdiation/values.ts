import {expect} from 'chai';
import {DataJSON, ValidationJSON} from '../../interfaces/json';
import {DataBase} from '../../models/data';
import {TemplateBase} from '../../models/template';


class MockData extends DataBase {}

describe('Template validation check with values', () => {
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
                dataJson.value = 'nothello';
                const data = new MockData(dataJson);
                expect(() => {
                    TemplateBase.validationsArrayExtensionCheck(data);
                }).to.throw(Error, 'The value must be either hello or world!');
            });

            it('should pass the inclusion test (first word)', () => {
                dataJson.value = 'hello';
                const data = new MockData(dataJson);
                expect(() => {
                    TemplateBase.validationsArrayExtensionCheck(data);
                }).to.not.throw();
            });

            it('should pass the inclusion test (second word)', () => {
                dataJson.value = 'world';
                const data = new MockData(dataJson);
                expect(() => {
                    TemplateBase.validationsArrayExtensionCheck(data);
                }).to.not.throw();
            });
        });

        describe('Exclusion', () => {

            const validations: ValidationJSON[] = [
                {
                    name: 'exclusion',
                    prompt: 'Value can not be hello or world',
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
                    message: 'The value must not be hello or world!'
                }
            ];
            const dataJson: DataJSON = {
                name: 'Test',
                value: 'hello',
                validations: validations
            };

            it('should fail the exclusion test (first word)', () => {
                dataJson.value = 'hello';
                const data = new MockData(dataJson);
                expect(() => {
                    TemplateBase.validationsArrayExtensionCheck(data);
                }).to.throw(Error, 'The value must not be hello or world!');
            });

            it('should fail the exclusion test (second word)', () => {
                dataJson.value = 'world';
                const data = new MockData(dataJson);
                expect(() => {
                    TemplateBase.validationsArrayExtensionCheck(data);
                }).to.throw(Error, 'The value must not be hello or world!');
            });

            it('should pass the exclusion test', () => {
                dataJson.value = 'nothello';
                const data = new MockData(dataJson);
                expect(() => {
                    TemplateBase.validationsArrayExtensionCheck(data);
                }).to.not.throw();
            });
        });


        describe('Format', () => {
            const validations: ValidationJSON[] = [
                {
                    name: 'format',
                    prompt: 'Value must be a valid email',
                    arguments: [
                        {
                            name: 'regex',
                            value: '^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
                            '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
                        }
                    ],
                    message: 'The supplied value is not a valid email address!'
                }
            ];
            const dataJson: DataJSON = {
                name: 'Test',
                value: 'bad.example.com',
                validations: validations
            };

            it('should fail the format test (invalid email)', () => {
                dataJson.value = 'bad.example.com';
                const data = new MockData(dataJson);
                expect(() => {
                    TemplateBase.validationsArrayExtensionCheck(data);
                }).to.throw(Error, 'The supplied value is not a valid email address!');
            });

            it('should pass the format test (valid email)', () => {
                dataJson.value = 'good@example.com';
                const data = new MockData(dataJson);
                expect(() => {
                    TemplateBase.validationsArrayExtensionCheck(data);
                }).to.not.throw();
            });
        });
    });
});
