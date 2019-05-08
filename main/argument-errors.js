function valueNotSpecified(flag) {
    throw new Error(`Value of flag not specified: -${flag}`);
}

function unknownFlag(flag) {
    throw new Error(`Unknown flag: -${flag}`);
}

function unexpectedValue(value) {
    throw new Error(`Unexpected value: ${value}`);
}

function invalidValue(flag, value) {
    throw new Error(`Invalid value for flag -${flag}: ${value}`);
}

const ArgumentErrors = {
    valueNotSpecified,
    unknownFlag,
    unexpectedValue,
    invalidValue,
};

export default ArgumentErrors;
