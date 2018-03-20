import React from 'react';
import PropTypes from "prop-types";
import control from "./control";

const defaults = {
    text: "text"
};

let Input = ({isChanged, isUsed, errorMessage, ...props}) => (
    <React.Fragment>
        <input
            className={`form-control ${isChanged && isUsed && errorMessage ? "is-invalid" : ""}`}
            name={props.name}
            type={props.inputType || defaults.text}
            placeholder={props.placeholder}
            {...props} />
        {(isChanged && isUsed && errorMessage) &&
        <span className="invalid-feedback">{errorMessage}</span>}
    </React.Fragment>
);

Input = control(Input);

Input.propTypes = {
    inputType: PropTypes.oneOf(['text', 'number']),
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    isChanged: PropTypes.bool,
    isUsed: PropTypes.bool,
    errorMessage: PropTypes.string
};

Input.defaultProps = {
    isChanged: false,
    isUsed: false
}

const LabelAndInput = ({label, ...props}) => (
    <div className="form-group">
        <label>{props.label}</label>
        <Input {...props} />
    </div>
);



LabelAndInput.propTypes = {
    label: PropTypes.string.isRequired,
};

export default LabelAndInput;