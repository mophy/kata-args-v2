import ArgumentErrors from './argument-errors';

export default class ArgumentSchemas extends Array {

    constructor(schemas) {
        super(...Array.from(schemas));
    }

    get(flag) {
        let result = this.find(schema => schema.flag === flag);
        if (!result) ArgumentErrors.unknownFlag(flag);
        return result;
    }

}
