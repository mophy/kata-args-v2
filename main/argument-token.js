export default class ArgumentToken {

    constructor(token) {
        this.token = token;
    }

    asFlag() {
        return this.token.substring(1);
    }

    isFlag() {
        return this.token && this.token.match(/^-[a-z]$/i);
    }

    isValue() {
        return this.token && !this.isFlag();
    }

    asValue() {
        return this.token;
    }

}
