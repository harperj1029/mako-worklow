class debug{
    constructor() {

    }
    error(...args) {
        window.console.error(args);
        throw new Error(args[0]);
    }
}

const noop = () => {};

const fakeDebug = {
    error: noop
}

function allowDebug(){
    return document.location.hostname == "localhost";
}

export default allowDebug() ? new debug() : fakeDebug;