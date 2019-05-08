import ArgumentTokenizer from './argument-tokenizer';
import ArgumentSchemas from './argument-schemas';
import Arguments from './arguments';

export default class ArgumentParser {

    constructor(schemas) {
        this.schemas = new ArgumentSchemas(schemas);
    }

    parse(input) {
        this.createArguments();
        this.tokenizeInput(input);
        this.parseTokens();
        return this.args;
    }

    createArguments() {
        this.args = new Arguments(this.schemas);
    }

    tokenizeInput(input) {
        this.tokens = new ArgumentTokenizer(input);
    }

    parseTokens() {
        while (this.tokens.hasMore()) this.parseToken();
    }

    parseToken() {
        let flag = this.tokens.nextFlag();
        let arg = this.args.get(flag);
        let schema = this.schemas.get(flag);
        arg.value = this.getValue(schema.type, flag);
    }

    getValue(type, flag) {
        let value = type.needValue() ? this.tokens.nextValue(flag) : undefined;
        return type.convert(value, flag);
    }

}
