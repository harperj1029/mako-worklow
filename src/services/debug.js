class debug {
    errorIf(condition, errorMessage) {
        if (typeof condition === "function") {
            condition = condition();
        }
        if (condition) {
            this.error(errorMessage);
        }
    }

    error(errorMessage) {
        window.console.error(errorMessage);
        throw new Error(errorMessage);
    }
}

const noop = () => {
};

const fakeDebug = {
    errorIf: noop,
    error: noop
}

function allowDebug() {
    return document.location.hostname === "localhost";
}

export default allowDebug() ? new debug() : fakeDebug;