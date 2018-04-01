import yup from "yup";

const isValidRequiredString = invalidMessage => async value => {
    const valid = await yup.string().min(1).isValid(value);
    return valid ? undefined : invalidMessage;
};
const isValidEmail = (requiredMessage, invalidMessage) => async value => {
    let valid = await yup.string().min(1).isValid(value);
    if(!valid){
        return requiredMessage;
    }
    valid = await  yup.string().email(invalidMessage).isValid(value);
    return valid === true ? undefined : invalidMessage;
};

export {
    isValidRequiredString,
    isValidEmail
};