import React, {Component} from "react";
import Input from "../../shared/Input";
import Select from "../../shared/Select";
import {isValidRequiredString, isValidEmail} from "../../shared/validations";
import PropTypes from 'prop-types';
import {Row, Col} from "react-bootstrap";

const accountTypes = {
    basic: "Basic",
    premium: "Premium",
    ultimate: "Ultimate"
};

export default class AccountInfo extends Component {
    constructor(props, context){
        super(props, context);

        this.workflowData =  props.workflowData;
    }

    static propTypes  = {
        workflowData: PropTypes.object.isRequired
    };

    static contextTypes = {
        workflowForm: PropTypes.object.isRequired
    };

    isValid(){
        return true;
    }

    getData(){
        const {workflowForm} = this.context;
        const data = workflowForm.getValues();

        return {
            ...this.workflowData,
            accountInfo: data
        };
    }

    render() {
        return (<React.Fragment>
            <Row>
                <Col sm={6} md={8} lg={6}>
                    <Input label="Name" name="fullName" placeholder="Full name"
                        value={this.props.workflowData.accountInfo.fullName}
                        type="text" validate={isValidRequiredString("Full name is required.")}/>
                </Col>
            </Row>
            <Row>
                <Col sm={6} md={8} lg={6}>
                    <Input label="Email" name="email" placeholder="Email"
                        value={this.props.workflowData.accountInfo.email}
                        type="email" validate={isValidEmail("Email is required.", "Must be a valid Email.")} />
                </Col>
            </Row>
           <Row>
                <Col sm={6} md={8} lg={6}>
                    <Select label="Account type" name="accountType"
                        options={accountTypes} unselectedText={"Select Account Type"}
                        value={this.props.workflowData.accountInfo.accountType}
                        validate={isValidRequiredString("Account type is required.")} />
                </Col>
           </Row></React.Fragment>);
    }
}