import ArgumentTypeList from './argument-type-list';
import ArgumentTypeInteger from './argument-type-integer';

export default class ArgumentTypeIntegers extends ArgumentTypeList {

    static itemClass() {
        return ArgumentTypeInteger;
    }

}
