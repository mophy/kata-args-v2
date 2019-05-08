import ArgumentType from './argument-type';

export default class ArgumentTypeList extends ArgumentType {

    static default() {
        return [];
    }

    static convert(value, flag) {
        return value.split(',')
            .map(this.convertItem(flag));
    }

    static convertItem(flag) {
        return value => this.itemClass()
            .convert(value, flag);
    }

}
