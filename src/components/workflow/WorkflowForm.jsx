import React, {Component} from "react";
import PropTypes from 'prop-types';
import omit from "object.omit";

export default class WorkflowForm extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            fields: {},
            errors: null
        };

        this.registerControl = this.registerControl.bind(this);
        this.unregisterControl = this.unregisterControl.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.getProps = this.getProps.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getValues = this.getValues.bind(this);
    }

    static childContextTypes = {
        workflowForm: PropTypes.object.isRequired
    };

    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    };

    registerControl(control, name) {
        this.setState(previousState => ({
            fields: {
                ...previousState.fields,
                [name]: {
                    ...control.props,
                    value: control.props.value || ""
                }
            }
        }), this.setFieldErrors);
    }

    unregisterControl(control, name) {
        this.setState(previousState => {

            return {
                fields: omit(previousState.fields, name)
            };
        });
    }

    handleChange(event, name) {
        this.setState(previousState => ({
            fields: {
                ...previousState.fields,
                [name]: {
                    ...previousState.fields[name],
                    isChanged: true,
                    isTouched: true,
                    value: event.target.value || ""
                }
            }
        }), this.setFieldErrors);
    }

    handleBlur(name) {
        this.setState(previousState => ({
            fields: {
                ...previousState.fields,
                [name]: {
                    ...previousState.fields[name],
                    isTouched: true
                }
            }
        }), this.setFieldErrors);
    }

    getProps(name) {
        if (this.state.fields[name]) {
            const {...props} = this.state.fields[name];
            return props;
        }
    }

    async setFieldErrors() {
        const runIt = async () => {
            const allFields = this.state.fields;
            const errors = new Map();
            const fields = {};

            for (const name of Object.keys(this.state.fields)) {
                const props = this.state.fields[name];

                fields[name] = {
                    ...this.state.fields[name]
                };

                if (props.validate) {
                    const error = await props.validate(props.value, props, allFields);
                    if (error) {
                        fields[name].error = error;
                        errors.set(name, error);
                    } else {
                        delete fields[name].error;
                    }
                }
            }
            return {
                fields,
                errors
            }
        };
        const result = await runIt();
        this.setState({
            ...this.state,
            fields: result.fields,
            errors: result.errors
        });
    }

    validate(name) {
        this.setState(previousState => ({
            fields: {
                ...previousState.fields,
                ...previousState.fields[name].reduce((fields, name) => {
                    fields[name] = {
                        ...previousState.fields[name],
                        isChanged: true,
                        isTouched: true
                    };

                    return fields;
                }, {})
            }
        }), this.setFieldErrors);
    }

    validateAll() {
        return new Promise(resolve => {
            this.setState(previousState => ({
                fields: {
                    ...previousState.fields,
                    ...Object.keys(previousState.fields).reduce((fields, name) => {
                            fields[name] = {
                                ...previousState.fields[name],
                                isChanged: true,
                                isTouched: true
                            };

                            return fields;
                        }, {})
                }
            }), async () => {
                await this.setFieldErrors();
                resolve();
            });
        });
    }

    getChildContext() {
        return {
            workflowForm: {
                connect: this.registerControl,
                disconnect: this.unregisterControl,
                handleChange: this.handleChange,
                handleBlur: this.handleBlur,
                getProps: this.getProps,
                getValues: this.getValues
            }
        };
    }

    getValues(){
        return Object.keys(this.state.fields).reduce((values, fieldName) => {
            values[fieldName] = this.state.fields[fieldName].value;
            return values;
        }, {});
    }

    async onSubmit(e) {
        e.preventDefault();

        await this.validateAll();
        this.props.onSubmit(!this.state.errors || this.state.errors.size === 0);
    }

    render() {
        const {onSubmit, ...props} = this.props; // eslint-disable-line no-unused-vars
        return <form className="mt-5" onSubmit={this.onSubmit} {...props}/>
    }
}