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

        const pngImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAYAAAD0f5bSAAAACXBIWXMAAAsTAAALEwEAmpwYAA' +
            'AAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAYhJREFUeNpiYMAB/v//r4NLjhFJEf+rz78yLjz+nPP+22/Bh29' +
            '/MMsLc/xVF+feaCDLO42RkfEoiiagBtk919+uWHbqhTkTUISbnfk/MxPj/++//jF++vGHyVlD6EeStXQyUOMKkHoWEHHq/sdlc448tZA' +
            'V5PgrxM36D9kpf//9/3v49nv2b7/+zgMa/hGocTsTkBGx6MQzCykBdgwNIAC0kUFZlOvP8Xsf2c8++tQJEmO68vRLzKfvfxlFedj+4fI4' +
            'SKM4H9vf43c/qIACiOnhu+8KbCyMDIQAJyvz/zdffjMDmfxM7CxMH5mAnmYgATCJ8LA9+AEMJUIKv/z8A1TL+hfI/MgEjIPNEvxs/15/+' +
            'cWESwMwBBmATmMyU+A/Cwy9K0ygsE+0kj7x4dsfJmwaf/35x3j39TcWSyX+n2aK/BXIkct//fnXzVMPPLL8+vMvIx8ny3+Ihv8MwNTB5KY' +
            'ljBK5KMkISKUfvPU+9sWnn4ogMS425v+aktyLVES5poOcxUAJAAgwAPVXsCDL7uRhAAAAAElFTkSuQmCC';

        const jpegImage = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAUAAA/+4ADkFkb2JlAGTA' +
            'AAAAAf/bAIQAAgICAgICAgICAgMCAgIDBAMCAgMEBQQEBAQEBQYFBQUFBQUGBgcHCAcHBgkJCgoJCQwMDAwMDAwMDAwMDAwMDAEDAwMF' +
            'BAUJBgYJDQsJCw0PDg4ODg8PDAwMDAwPDwwMDAwMDA8MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgACgAKAwERAAIRAQMRAf' +
            '/EAaIAAAAHAQEBAQEAAAAAAAAAAAQFAwIGAQAHCAkKCwEAAgIDAQEBAQEAAAAAAAAAAQACAwQFBgcICQoLEAACAQMDAgQCBgcDBAIGAnMB' +
            'AgMRBAAFIRIxQVEGE2EicYEUMpGhBxWxQiPBUtHhMxZi8CRygvElQzRTkqKyY3PCNUQnk6OzNhdUZHTD0uIIJoMJChgZhJRFRqS0VtNVKBry' +
            '4/PE1OT0ZXWFlaW1xdXl9WZ2hpamtsbW5vY3R1dnd4eXp7fH1+f3OEhYaHiImKi4yNjo+Ck5SVlpeYmZqbnJ2en5KjpKWmp6ipqqusra6vo' +
            'RAAICAQIDBQUEBQYECAMDbQEAAhEDBCESMUEFURNhIgZxgZEyobHwFMHR4SNCFVJicvEzJDRDghaSUyWiY7LCB3PSNeJEgxdUkwgJChg' +
            'ZJjZFGidkdFU38qOzwygp0+PzhJSktMTU5PRldYWVpbXF1eX1RlZmdoaWprbG1ub2R1dnd4eXp7fH1+f3OEhYaHiImKi4yNjo+DlJWWl' +
            '5iZmpucnZ6fkqOkpaanqKmqq6ytrq+v/aAAwDAQACEQMRAD8A+hvlryNoureUNMm1S1W31zUqm31txLFcvNdXZt4p5mM8sdzC1xIkbtwjkQ' +
            'sDuu+eM6bsvH2hpImYqcuU9xKzLhEj6pRyQMyIy2hON3uH2HWdq5dLq5DGbxx5x2MajHiMR6YmExAGURcoyqti+fv8QeYP99XX9/8Aob7' +
            'bfb/5YvtfZ/yPs5zf5TVd8uXh8z/pOfLy5PXeFpv6P+qcv9n7/Pm15z/3pm/vusn+8X+83+9H/Hv/AMVfye9Mli/vpcuZ+j6fq/h/o93m' +
            'jR/3Y9w+r6vp/i/pd/laT/8AhJf8ol/n/wBvXN7/AKT6Px/yWaf+Vv8Ae/j/AJIP/9k=';

        const svgImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ' +
            '2h0PSIxMCIgdmlld0JveD0iMCAwIDEwIDEwIj48cGF0aCBkPSJNOS4zODQuMDVsLjYzNy42MzdMLjYxNyAxMC4wOWwtLjYzNi0uNjM1ek0uNjE' +
            '2LjA1bDkuNDA0IDkuNDA1LS42MzYuNjM2TC0uMDIuNjg4eiIvPjwvc3ZnPg==';

        describe('File type', () => {
            const validations: ValidationJSON[] = [
                {
                    name: 'file_type',
                    prompt: 'file must be either png or jpg/jpeg',
                    arguments: [
                        {
                            name: 'option',
                            value: 'jpg'
                        },
                        {
                            name: 'option',
                            value: 'jpeg'
                        },
                        {
                            name: 'option',
                            value: 'png'
                        }
                    ],
                    message: 'The supplied file is invalid (must be a png or a jpg/jpeg)'
                }
            ];

            const dataJson: DataJSON = {
                name: 'Test',
                value: pngImage,
                validations: validations
            };

            it('should fail the file_type test (svg)', () => {
                dataJson.value = svgImage;
                const data = new MockData(dataJson);
                expect(() => {
                    TemplateBase.validationsArrayExtensionCheck(data);
                }).to.throw(Error, 'The supplied file is invalid (must be a png or a jpg/jpeg)');
            });

            it('should pass the file_type test (png)', () => {
                dataJson.value = pngImage;
                const data = new MockData(dataJson);
                expect(() => {
                    TemplateBase.validationsArrayExtensionCheck(data);
                }).to.not.throw();
            });

            it('should pass the file_type test (jpeg)', () => {
                dataJson.value = jpegImage;
                const data = new MockData(dataJson);
                expect(() => {
                    TemplateBase.validationsArrayExtensionCheck(data);
                }).to.not.throw();
            });
        });

        describe('File size', () => {
            const validations: ValidationJSON[] = [
                {
                    name: 'file_size',
                    prompt: 'file can\'t be larger than 850 bytes',
                    arguments: [
                        {
                            name: 'lower_bound',
                            value: '0'
                        },
                        {
                            name: 'upper_bound',
                            value: '850'
                        }
                    ],
                    message: 'The supplied file is larger than 850 bytes'
                }
            ];

            const dataJson: DataJSON = {
                name: 'Test',
                value: pngImage,
                validations: validations
            };

            it('should fail the file_size test (jpeg larger than 850)', () => {
                dataJson.value = jpegImage;
                const data = new MockData(dataJson);
                expect(() => {
                    TemplateBase.validationsArrayExtensionCheck(data);
                }).to.throw(Error, 'The supplied file is larger than 850 bytes');
            });

            it('should pass the file_size test (png smaller than 850 bytes)', () => {
                dataJson.value = pngImage;
                const data = new MockData(dataJson);
                expect(() => {
                    TemplateBase.validationsArrayExtensionCheck(data);
                }).to.not.throw();
            });

            it('should pass the file_type test (svg smaller than 850 bytes)', () => {
                dataJson.value = svgImage;
                const data = new MockData(dataJson);
                expect(() => {
                    TemplateBase.validationsArrayExtensionCheck(data);
                }).to.not.throw();
            });
        });
    });
});
