import React, {Component} from "react";
import PropTypes from 'prop-types';
import omit from "object.omit";

export default class WorkflowForm extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            fieldNameToIds: {},
            fields: {},
            errors: null
        };

        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.getProps = this.getProps.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    static childContextTypes = {
        workflowForm: PropTypes.object.isRequired
    };

    static propTypes = {
        onSubmit: PropTypes.func.isRequired
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
        }), this.setFieldErrors);
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

    handleChange(event, id) {
        this.setState(previousState => ({
            fields: {
                ...previousState.fields,
                [id]: {
                    ...previousState.fields[id],
                    isChanged: true,
                    isTouched: true,
                    value: event.target.value || ""
                }
            }
        }), this.setFieldErrors);
    }

    handleBlur(id) {
        this.setState(previousState => ({
            fields: {
                ...previousState.fields,
                [id]: {
                    ...previousState.fields[id],
                    isTouched: true
                }
            }
        }), this.setFieldErrors);
    }

    getProps(id) {
        if (this.state.fields[id]) {
            const {...props} = this.state.fields[id];
            return props;
        }
    }

    async setFieldErrors() {
        const runIt = async () => {
            const allFields = Object.keys(this.state.fieldNameToIds).reduce((allFields, name) => {
                allFields[name] = this.state.fieldNameToIds[name].map(id => this.state.fields[id]);
                return allFields;
            }, {});
            const errors = new Map();
            const fields = {};
            for (const id of Object.keys(this.state.fields)) {
                const props = this.state.fields[id];

                fields[id] = {
                    ...this.state.fields[id]
                };

                if (props.validate) {
                    const error = await props.validate(props.value, props, allFields);
                    if (error) {
                        fields[id].error = error;
                        errors.set(id, error);
                    } else {
                        delete fields[id].error;
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
                ...previousState.fields[name].reduce((fields, id) => {
                    fields[id] = {
                        ...previousState.fields[id],
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
                    ...Object.keys(previousState.fieldNameToIds).reduce((fields, name) => {
                        previousState.fieldNameToIds[name].reduce((components, id) => {
                            fields[id] = {
                                ...previousState.fields[id],
                                isChanged: true,
                                isTouched: true
                            };

                            return components;
                        }, {});

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
                connect: this.connect,
                disconnect: this.disconnect,
                handleChange: this.handleChange,
                handleBlur: this.handleBlur,
                getProps: this.getProps
            }
        };
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