import React, {Component} from "react";
import WorkflowStepDescription from "../../services/workflow/workflowStepDescription";
import PropTypes from 'prop-types';
import omit from "object.omit";

class WorkflowStep extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            fieldNameToIds: {},
            fields: {}
        };

        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getProps = this.getProps.bind(this);
    }

    static childContextTypes = {
        connect: PropTypes.func.isRequired,
        disconnect: PropTypes.func.isRequired,
        handleChange: PropTypes.func.isRequired,
        getProps: PropTypes.func.isRequired
    };

    static propTypes = {
        stepDescription: PropTypes.instanceOf(WorkflowStepDescription)
    };

    connect(control, id) {
        this.setState(previousState => ({
            fieldNameToIds: {
                ...previousState.fieldNameToIds,
                [control.props.name]: [...(previousState.fieldNameToIds[control.props.name] || []), id]
            },
            fields: {
                ...previousState.fields,
                [id]: {
                    ...control.props,
                    value: control.props.value || ""
                }
            }
        }), this.runValidation);
    }

    disconnect(control, id) {
        this.setState(previousState => {
            const fieldIdsForName = [...previousState.fieldNameToIds[control.props.name]];

            fieldIdsForName.splice(fieldIdsForName.indexOf(id), 1);

            // Either reduce the id-mapped fields (if some still remain) or eliminate the field
            const fieldNameToIds = fieldIdsForName.length ? {
                ...previousState.fieldNameToIds,
                ...{[control.props.name]: fieldIdsForName}
            } : omit(previousState.fieldNameToIds, control.props.name);

            return {
                fieldNameToIds,
                fields: omit(previousState.fields, id)
            };
        });
    }

    handleChange(event, id){
        this.setState({
            fields: {
                ...this.state.fields,
                [id]: {
                    ...this.state.fields[id],
                    isChanged: true,
                    isUsed: true,
                    value: event.target.value || ""
                }
            }
        }, this.validateStep);
    }

    handleBlur(id){
        this.setState({
            fields: {
                ...this.fields,
                [id]: {
                    ...this.fields[id],
                    isUsed: true
                }
            }
        });
    }

    getProps(id) {
        if (this.state.fields[id]) {
            const {...props } = this.state.fields[id];

            return props;
        }
    }

    validateStep(){

    }

    getChildContext() {
        return {
            connect: this.connect,
            disconnect: this.disconnect,
            handleChange: this.handleChange,
            getProps: this.getProps
        };
    }


    render() {
        const Step = this.props.stepDescription.component;
        return <Step/>;
    }
}

export default WorkflowStep;