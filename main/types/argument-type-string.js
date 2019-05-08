import ArgumentType from './argument-type';

export default class ArgumentTypeString extends ArgumentType {

    static default() {
        return '';
    }

    static convert(value) {
        return value;
    }

}
