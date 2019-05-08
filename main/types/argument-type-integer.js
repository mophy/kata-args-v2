import ArgumentType from './argument-type';
import Errors from '../argument-errors';

export default class ArgumentTypeInteger extends ArgumentType {

    static default() {
        return 0;
    }

    static convert(value, flag) {
        this.validate(value, flag);
        return this.convertInteger(value);
    }

    static validate(value, flag) {
        if (!value.match(/^[-]?\d+$/)) Errors.invalidValue(flag, value);
    }

    static convertInteger(value) {
        return parseInt(value, 10);
    }

}
