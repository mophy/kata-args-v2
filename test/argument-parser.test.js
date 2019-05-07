import ArgumentParser from '../main/argument-parser';
import ArgumentSchema from '../main/argument-schema';
import ArgumentTypes from '../main/argument-types';
import Argument from '../main/argument';

const BOOLEAN = ArgumentTypes.BOOLEAN;
const STRING = ArgumentTypes.STRING;
const INTEGER = ArgumentTypes.INTEGER;
const STRINGS = ArgumentTypes.STRINGS;
const INTEGERS = ArgumentTypes.INTEGERS;

function expectParseSucceed(input, params) {
    let schemas = params.map(param => new ArgumentSchema(param.flag, param.type));
    let parser = new ArgumentParser(schemas);

    let args = parser.parse(input);

    expect(args).toHaveLength(params.length);
    params.forEach((param, i) => {
        expect(args[i]).toBeInstanceOf(Argument);
        expect(args[i]).toEqual({ flag: param.flag, value: param.value });
    });
}

function expectParseFailed(input, params, error) {
    let schemas = params.map(param => new ArgumentSchema(param.flag, param.type));
    let parser = new ArgumentParser(schemas);

    expect(() => parser.parse(input)).toThrow(error);
}

describe('ArgumentParser', () => {

    describe('constructor', () => {

        it('should accept schemas argument', () => {
            let parser = new ArgumentParser([]);

            expect(parser.schemas).toEqual([]);
        });

    });

    describe('default values', () => {

        it('should return default value for boolean schema', () => {
            expectParseSucceed('', [
                { flag: 'b', type: BOOLEAN, value: false },
            ]);
        });

        it('should return default value for integer schema', () => {
            expectParseSucceed('', [
                { flag: 'i', type: INTEGER, value: 0 },
            ]);
        });

        it('should return default value for string schema', () => {
            expectParseSucceed('', [
                { flag: 's', type: STRING, value: '' },
            ]);
        });

    });

    describe('with 1 argument', () => {

        it('should handle boolean argument', () => {
            expectParseSucceed('-b', [
                { flag: 'b', type: BOOLEAN, value: true },
            ]);
        });

        it('should handle string argument', () => {
            expectParseSucceed('-s hello', [
                { flag: 's', type: STRING, value: 'hello' },
            ]);
        });

        it('should handle integer argument', () => {
            expectParseSucceed('-i 123', [
                { flag: 'i', type: INTEGER, value: 123 },
            ]);
        });

        it('should handle negative integer argument', () => {
            expectParseSucceed('-i -123', [
                { flag: 'i', type: INTEGER, value: -123 },
            ]);
        });

        it('should handle integer argument with boolean default value', () => {
            expectParseSucceed('-i 123', [
                { flag: 'i', type: INTEGER, value: 123 },
                { flag: 'b', type: BOOLEAN, value: false },
            ]);
        });

    });

    describe('with 2 arguments', () => {

        it('should handle integer and boolean arguments', () => {
            expectParseSucceed('-i 123 -b', [
                { flag: 'i', type: INTEGER, value: 123 },
                { flag: 'b', type: BOOLEAN, value: true },
            ]);
        });

        it('should handle negative integer and boolean arguments', () => {
            expectParseSucceed('-i -123 -b', [
                { flag: 'i', type: INTEGER, value: -123 },
                { flag: 'b', type: BOOLEAN, value: true },
            ]);
        });

        it('should handle boolean and integer arguments', () => {
            expectParseSucceed('-b -i 123', [
                { flag: 'i', type: INTEGER, value: 123 },
                { flag: 'b', type: BOOLEAN, value: true },
            ]);
        });

        it('should handle integer and string arguments', () => {
            expectParseSucceed('-i 123 -s hello', [
                { flag: 'i', type: INTEGER, value: 123 },
                { flag: 's', type: STRING, value: 'hello' },
            ]);
        });

    });

    describe('with 3 arguments', () => {

        it('should handle integer, boolean and string arguments', () => {
            expectParseSucceed('-i 123 -b -s hello', [
                { flag: 'i', type: INTEGER, value: 123 },
                { flag: 'b', type: BOOLEAN, value: true },
                { flag: 's', type: STRING, value: 'hello' },
            ]);
        });

        it('should handle negative integer, boolean and string arguments', () => {
            expectParseSucceed('-i -123 -b -s hello', [
                { flag: 'i', type: INTEGER, value: -123 },
                { flag: 'b', type: BOOLEAN, value: true },
                { flag: 's', type: STRING, value: 'hello' },
            ]);
        });

    });

    describe('error handling', () => {

        it('should report error if flag not specified', () => {
            expectParseFailed('-b', [
            ], /unknown flag: -b/i);
        });

        it('should report error if string value not passed', () => {
            expectParseFailed('-s', [
                { flag: 's', type: STRING },
            ], /value of flag not specified: -s/i);
        });

        it('should report error if string value not passed but flag followed', () => {
            expectParseFailed('-s -b', [
                { flag: 's', type: STRING },
                { flag: 'b', type: BOOLEAN },
            ], /value of flag not specified: -s/i);
        });

        it('should report error if value passed before flag', () => {
            expectParseFailed('hello -s world', [
                { flag: 's', type: STRING },
            ], /unexpected value: hello/i);
        });

    });

    describe('with lists', () => {

        it('should handle string list arguments', () => {
            expectParseSucceed('-s hello,world,again', [
                { flag: 's', type: STRINGS, value: ['hello', 'world', 'again'] },
            ]);
        });

        it('should handle integer list arguments', () => {
            expectParseSucceed('-i 3,-2,1', [
                { flag: 'i', type: INTEGERS, value: [3, -2, 1] },
            ]);
        });

        it('should handle string list and integer list arguments', () => {
            expectParseSucceed('-i 3,-2,1 -s hello,world,again', [
                { flag: 'i', type: INTEGERS, value: [3, -2, 1] },
                { flag: 's', type: STRINGS, value: ['hello', 'world', 'again'] },
            ]);
        });

        it('should return default value for string list schema', () => {
            expectParseSucceed('', [
                { flag: 's', type: STRINGS, value: [] },
            ]);
        });

        it('should return default value for integer list schema', () => {
            expectParseSucceed('', [
                { flag: 'i', type: INTEGERS, value: [] },
            ]);
        });

    });

});
