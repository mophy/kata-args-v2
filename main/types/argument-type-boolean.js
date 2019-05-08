import ArgumentType from './argument-type';

export default class ArgumentTypeBoolean extends ArgumentType {

    static default() {
        return false;
    }

    static needValue() {
        return false;
    }

    static convert() {
        return true;
    }

}
