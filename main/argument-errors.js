function valueNotSpecified(flag) {
    throw new Error(`Value of flag not specified: -${flag}`);
}

function unknownFlag(flag) {
    throw new Error(`Unknown flag: -${flag}`);
}

function unexpectedValue(value) {
    throw new Error(`Unexpected value: ${value}`);
}

const ArgumentErrors = {
    valueNotSpecified,
    unknownFlag,
    unexpectedValue,
};

export default ArgumentErrors;
