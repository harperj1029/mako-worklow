import yup from "yup";




const yupEmail = yup.object().shape({
    value: yup.string().email()()
});

function email(value, fieldProps){
    //TODO: support for async validation
    // const isValid = await yupRequired.isValid({
    //     value
    // });
    return value ? null : `${fieldProps.label} is required.`
}

function required(value, fieldProps) {
    //TODO: support for async validation
    // const yupRequired = yup.object().shape({
    //     value: yup.string().required()
    // });
    // const isValid = await yupRequired.isValid({
    //     value
    // });
    return value ? null : `${fieldProps.label} is required.`
}

export default {
    email,
    required
};