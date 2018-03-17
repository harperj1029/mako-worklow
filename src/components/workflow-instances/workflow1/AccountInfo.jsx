import React, {Component} from "react";
import SingleInput from "../../shared/SingleInput";
import Select from "../../shared/Select";

const accountTypes = {
    basic: "Basic",
    premium: "Premium",
    ultimate: "Ultimate"
};

export default class AccountInfo extends Component{
    constructor(props) {
        super(props);

        this.state = {
            fullName: "",
            email: "",
            accountType: "premium"
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;

        this.setState({
            [target.name]: target.value
        });
    }

    render(){
        return (<div>
            <div className="row">
                <div className="col-sm col-md-8 col-lg-6">
                    <SingleInput title="Name" name="fullName" controlFunc={this.handleInputChange} content={this.state.fullName}/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm col-md-8 col-lg-6">
                    <SingleInput title="Email" name="email" controlFunc={this.handleInputChange} content={this.state.email}/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm col-md-8 col-lg-6">
                    <Select title="Account type" name="accountType" options={accountTypes}
                            controlFunc={this.handleInputChange} selectedOption={this.state.accountType}/>
                </div>
            </div>
        </div>);
    }
}