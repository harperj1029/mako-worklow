import yup from "yup";

const yupRequired =  yup.object().shape({
    input: yup.string().required()
});

const required = async input =>{
    return await yupRequired.isValid({
       input
    });
};

export default {
  required
};