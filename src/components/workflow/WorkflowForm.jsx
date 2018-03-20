import React, {Component} from "react";
import PropTypes from 'prop-types';
import omit from "object.omit";

export default class WorkflowForm extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            fieldNameToIds: {},
            fields: {},
            errorSummary: null
        };

        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.getProps = this.getProps.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    static childContextTypes = {
        connect: PropTypes.func.isRequired,
        disconnect: PropTypes.func.isRequired,
        handleChange: PropTypes.func.isRequired,
        handleBlur: PropTypes.func.isRequired,
        getProps: PropTypes.func.isRequired
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
                    value: control.props.value || "",
                    validations: control.props.validations || []
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
                    isUsed: true,
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
                    isUsed: true
                }
            }
        }));
    }

    getProps(id) {
        if (this.state.fields[id]) {
            const {...props} = this.state.fields[id];
            return props;
        }
    }

    setFieldErrors() {
        this.setState(previousState => {
            const allFields = Object.keys(previousState.fieldNameToIds).reduce((allFields, name) => {
                allFields[name] = previousState.fieldNameToIds[name].map(id => previousState.fields[id]);
                return allFields;
            }, {});
            const errorSummary = new Map();
            const fields = Object.keys(previousState.fields).reduce((updatedFields, id) => {
                const fieldProps = previousState.fields[id];

                updatedFields[id] = {
                    ...previousState.fields[id]
                };

                for (const validation of fieldProps.validations) {
                    const error = validation(fieldProps.value, fieldProps, allFields);

                    if (error) {
                        updatedFields[id].error = error;
                        errorSummary.set(id, error);

                        break;
                    } else {
                        delete updatedFields[id].error;
                    }
                }
                return updatedFields;
            }, {});

            return {
                fields: fields,
                errorSummary: errorSummary
            };
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
                        isUsed: true
                    };

                    return fields;
                }, {})
            }
        }), this.setFieldErrors);
    }

    validateAll() {
        this.setState(previousState => ({
            fields: {
                ...previousState.fields,
                ...Object.keys(previousState.fieldNameToIds).reduce((fields, name) => {
                    previousState.fieldNameToIds[name].reduce((components, id) => {
                        fields[id] = {
                            ...previousState.fields[id],
                            isChanged: true,
                            isUsed: true
                        };

                        return components;
                    }, {});

                    return fields;
                }, {})
            }
        }), this.setFieldErrors);
    }


    getChildContext() {
        return {
            connect: this.connect,
            disconnect: this.disconnect,
            handleChange: this.handleChange,
            handleBlur: this.handleBlur,
            getProps: this.getProps
        };
    }

    onSubmit(e) {
        e.preventDefault();

        this.validateAll();
        this.props.onSubmit(!this.state.errorSummary || this.state.errorSummary.size === 0);
    }

    render() {
        const {onSubmit, ...props} = this.props; // eslint-disable-line no-unused-vars
        return <form className="mt-5" onSubmit={this.onSubmit} {...props}/>
    }
}