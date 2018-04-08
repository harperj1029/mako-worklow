import React, {Component} from "react";
import PropTypes from "prop-types";
import {Row, Col} from "react-bootstrap";
import Checkbox from "../../shared/checkbox.jsx";

export default class Preferences extends Component {
    constructor(props, context) {
        super(props, context);

        this.workflowData = {
            ...props.workflowData,
            preferences: props.workflowData.preferences || {
                autoPay: false,
                notifyUpcomingEvents: true,
                notifyProductChanges: true
            }
        };
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
        const {workflowForm} = this.context;
        const data = workflowForm.getValues();

        return {
            ...this.workflowData,
            preferences: data
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="card">
                    <div className="card-header">Billing</div>
                    <div className="card-body">
                        <Row>
                            <Col sm={6} md={8} lg={6}>
                                <Checkbox label=" Set me up for autopay." name="autoPay"
                                  checked={this.workflowData.preferences.autoPay}/>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="card mt-3">
                    <div className="card-header">Notifications</div>
                    <div className="card-body">
                        <Row>
                            <Col sm={6} md={8} lg={6}>
                                <Checkbox label=" Notify me of product changes." name="notifyProductChanges"
                                    checked={this.workflowData.preferences.notifyProductChanges}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} md={8} lg={6}>
                                <Checkbox label=" Notify me of ucoming events." name="notifyUpcomingEvents"
                                    checked={this.workflowData.preferences.notifyUpcomingEvents}/>
                            </Col>
                        </Row>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
