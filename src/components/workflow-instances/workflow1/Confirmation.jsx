import React, {Component} from "react";
import PropTypes from "prop-types";
import {Table} from "react-bootstrap";
import {ToastContainer, toast} from 'react-toastify';
import {Redirect} from "react-router-dom";

export default class Confirmation extends Component {
    constructor(props, context) {
        super(props, context);

        this.workflowData = props.workflowData;
        this.state = {
            redirect: false
        };

        this.redirect = this.redirect.bind(this);
    }

    static propTypes = {
        workflowData: PropTypes.object.isRequired
    };

    static contextTypes = {
        workflowForm: PropTypes.object.isRequired
    };

    isValid() {
        return true;
    }

    getData() {
        return this.workflowData;
    }

    redirect() {
        this.setState({
            redirect: true
        });
    }

    finish() {
        toast.success("Wow so easy !", {
            position: toast.POSITION.TOP_CENTER,
            onClose: this.redirect
        });

    }

    render() {
        if (this.state.redirect === false) {
            return (<React.Fragment>
                <ToastContainer autoClose={2000}/>
                <Table>
                    <thead>
                    <tr>
                        <th>Setting</th>
                        <th>Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{this.workflowData.accountInfo.fullName}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{this.workflowData.accountInfo.email}</td>
                    </tr>
                    <tr>
                        <td>Account type</td>
                        <td>{this.workflowData.accountInfo.accountType}</td>
                    </tr>
                    <tr>
                        <td>Billing / Autopay</td>
                        <td>{this.workflowData.preferences.autoPay ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td>Notifications / Product changes</td>
                        <td>{this.workflowData.preferences.notifyProductChanges ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td>Notifications / Upcoming events</td>
                        <td>{this.workflowData.preferences.notifyUpcomingEvents ? "Yes" : "No"}</td>
                    </tr>
                    </tbody>
                </Table>
            </React.Fragment>)
        }
        if (this.state.redirect) {
            return <Redirect to="/"/>
        }
    }
}
