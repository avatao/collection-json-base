import {expect} from 'chai';
import {DataJSON, ValidationJSON} from '../../interfaces/json';
import {DataBase} from '../../models/data';
import {TemplateBase} from '../../models/template';


class MockData extends DataBase {}

describe('Validations Array extension check with arrays', () => {
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
            array: undefined,
            validations: validations
        };

        it('should fail the presence test', () => {
            const data = new MockData(dataJson);
            expect(() => {
                TemplateBase.validationsArrayExtensionCheck(data);
            }).to.throw(Error, 'Test is undefined, it is required!');
        });

        it('should pass the presence test', () => {
            dataJson.array = ['something'];
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
                prompt: 'Array values must be either hello or world',
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
                message: 'Invalid array values! Only the word hello and world is accepted'
            }
        ];
        const dataJson: DataJSON = {
            name: 'Test',
            array: ['nothello', 'hello'],
            validations: validations
        };

        it('should fail the inclusion test', () => {
            dataJson.array = ['nothello', 'hello'];
            const data = new MockData(dataJson);
            expect(() => {
                TemplateBase.validationsArrayExtensionCheck(data);
            }).to.throw(Error, 'Invalid array values! Only the word hello and world is accepted');
        });

        it('should pass the inclusion test (one word)', () => {
            dataJson.array = ['hello'];
            const data = new MockData(dataJson);
            expect(() => {
                TemplateBase.validationsArrayExtensionCheck(data);
            }).to.not.throw();
        });

        it('should pass the inclusion test (multiple words)', () => {
            dataJson.array = ['world', 'hello', 'world', 'hello'];
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
                prompt: 'Values in the array cannot be hello or world',
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
                message: 'Invalid values in the array! The values must not be hello or world'
            }
        ];
        const dataJson: DataJSON = {
            name: 'Test',
            array: ['hello', 'somethingelse', 'thisisvalid'],
            validations: validations
        };

        it('should fail the exclusion test (using first blacklist word)', () => {
            dataJson.array = ['hello', 'somethingelse', 'thisisvalid'];
            const data = new MockData(dataJson);
            expect(() => {
                TemplateBase.validationsArrayExtensionCheck(data);
            }).to.throw(Error, 'Invalid values in the array! The values must not be hello or world');
        });

        it('should fail the exclusion test (using second blacklist word)', () => {
            dataJson.array = ['nothello', 'somethingelse', 'world'];
            const data = new MockData(dataJson);
            expect(() => {
                TemplateBase.validationsArrayExtensionCheck(data);
            }).to.throw(Error, 'Invalid values in the array! The values must not be hello or world');
        });

        it('should pass the exclusion test', () => {
            dataJson.array = ['nothello', 'validvalue'];
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
                prompt: 'Values in the array must be valid emails',
                arguments: [
                    {
                        name: 'regex',
                        value: '^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
                        '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
                    }
                ],
                message: 'Invalid values in the array! The values must be valid emails'
            }
        ];
        const dataJson: DataJSON = {
            name: 'Test',
            array: ['bad.example.com', 'another@bad', 'thisisbad.to'],
            validations: validations
        };

        it('should fail the format test (invalid emails in the array)', () => {
            dataJson.array = ['bad.example.com', 'another@bad', 'thisisbad.to', 'thisis@valid.com'];
            const data = new MockData(dataJson);
            expect(() => {
                TemplateBase.validationsArrayExtensionCheck(data);
            }).to.throw(Error, 'Invalid values in the array! The values must be valid emails');
        });

        it('should pass the format test (valid emails)', () => {
            dataJson.array = ['good@example.com', 'goodtoo@good.at'];
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
                prompt: 'The files in the array must be either png or jpg/jpeg',
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
                message: 'Invalid values in the array! Every file in the array must be either png or jpg/jpeg'
            }
        ];

        const dataJson: DataJSON = {
            name: 'Test',
            array: [pngImage, svgImage],
            validations: validations
        };

        it('should fail the file_type test (svg and png in the array)', () => {
            dataJson.array = [pngImage, svgImage];
            const data = new MockData(dataJson);
            expect(() => {
                TemplateBase.validationsArrayExtensionCheck(data);
            }).to.throw(Error, 'Invalid values in the array! Every file in the array must be either png or jpg/jpeg');
        });

        it('should pass the file_type test (png and jpeg in the array)', () => {
            dataJson.array = [pngImage, jpegImage];
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
                prompt: 'The files in the array can\'t be larger than 850 bytes',
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
                message: 'Invalid files in the array! The files can\'t be larger than 850 bytes'
            }
        ];

        const dataJson: DataJSON = {
            name: 'Test',
            array: [jpegImage, pngImage, svgImage],
            validations: validations
        };

        it('should fail the file_size test (jpeg larger than 850 and it is in the array)', () => {
            dataJson.array = [jpegImage, pngImage, svgImage];
            const data = new MockData(dataJson);
            expect(() => {
                TemplateBase.validationsArrayExtensionCheck(data);
            }).to.throw(Error, 'Invalid files in the array! The files can\'t be larger than 850 bytes');
        });

        it('should pass the file_size test (jpeg is not in the array, svg and png < 850 bytes)', () => {
            dataJson.array = [pngImage, svgImage];
            const data = new MockData(dataJson);
            expect(() => {
                TemplateBase.validationsArrayExtensionCheck(data);
            }).to.not.throw();
        });
    });
});
