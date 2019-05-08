import ArgumentTypeList from './argument-type-list';
import ArgumentTypeString from './argument-type-string';

export default class ArgumentTypeStrings extends ArgumentTypeList {

    static itemClass() {
        return ArgumentTypeString;
    }

}
