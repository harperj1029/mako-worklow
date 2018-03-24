import React, {Component} from "react";
import Input from "../../shared/Input";
//import Select from "../../shared/Select";
import yup from "yup";

/*
const accountTypes = {
    basic: "Basic",
    premium: "Premium",
    ultimate: "Ultimate"
};
*/


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

export default class AccountInfo extends Component {
    render() {
        return (<div>
            <div className="row">
                <div className="col-sm col-md-8 col-lg-6">
                    <Input label="Name" name="fullName" placeholder="Full name"
                        type="text" validate={isValidRequiredString("Full name is required.")}/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm col-md-8 col-lg-6">
                    <Input label="Email" name="email" placeholder="Email"
                        type="email" validate={isValidEmail("Email is required.", "Must be a valid Email.")} />
                </div>
            </div>
           {/* <div className="row">
                <div className="col-sm col-md-8 col-lg-6">
                    <Select label="Account type" name="accountType" options={accountTypes}/>
                </div>
            </div>*/}
        </div>);
    }
}