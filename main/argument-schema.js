import ArgumentTypes from './argument-types';

const VALUE_CONVERTERS = {
    [ArgumentTypes.BOOLEAN]: () => true,
    [ArgumentTypes.STRING]: value => value,
    [ArgumentTypes.INTEGER]: value => parseInt(value, 10),
    [ArgumentTypes.STRINGS]: value => value.split(',').map(VALUE_CONVERTERS[ArgumentTypes.STRING]),
    [ArgumentTypes.INTEGERS]: value => value.split(',').map(VALUE_CONVERTERS[ArgumentTypes.INTEGER]),
};

export default class ArgumentSchema {

    constructor(flag, type) {
        this.flag = flag;
        this.type = type;
    }

    needValue() {
        return this.type !== ArgumentTypes.BOOLEAN;
    }

    convert(value) {
        return VALUE_CONVERTERS[this.type](value);
    }

}
