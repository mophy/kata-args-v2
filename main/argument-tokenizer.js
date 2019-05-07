import ArgumentToken from './argument-token';
import ArgumentErrors from './argument-errors';

export default class ArgumentTokenizer {

    constructor(input) {
        this.tokens = this.tokenize(input).map(this.createToken);
    }

    tokenize(input) {
        return input ? input.split(' ') : [];
    }

    createToken(token) {
        return new ArgumentToken(token);
    }

    nextFlag() {
        let token = this.nextToken();
        if (!token.isFlag()) ArgumentErrors.unexpectedValue(token.asValue());
        return token.asFlag();
    }

    nextValue(flag) {
        let token = this.nextToken();
        if (!token || !token.isValue()) ArgumentErrors.valueNotSpecified(flag);
        return token.asValue();
    }

    nextToken() {
        return this.tokens.shift();
    }

    hasMore() {
        return !!this.tokens.length;
    }

}
