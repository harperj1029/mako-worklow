import yup from "yup";

const yupRequired = yup.object().shape({
    value: yup.string().required()
});

function required(value, fieldProps) {
    // const isValid = await yupRequired.isValid({
    //     value
    // });

    return value ? null : `${fieldProps.name} is required.`
}

export default {
    required
};