import Argument from './argument';

export default class Arguments extends Array {

    constructor(schemas) {
        super(...schemas.map(Arguments.createArgument));
    }

    static createArgument(schema) {
        return new Argument(schema.flag, schema.type.default());
    }

    get(flag) {
        return this.find(arg => arg.flag === flag);
    }

}
