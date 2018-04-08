import React from 'react';
import PropTypes from "prop-types";
import Control from "./control";
import omit from "object.omit";
import {FormGroup, ControlLabel} from "react-bootstrap";

const defaults = {
    text: "text"
};

const Input = ({label, ...props}) => (
    <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        <Control label={label} {...props} render={({isChanged, isTouched, error, ...props}) => (
            <React.Fragment>
                <input
                    className={`form-control ${isChanged && isTouched && error ? "is-invalid" : ""}`}
                    name={props.name}
                    type={props.type || defaults.text}
                    placeholder={props.placeholder}
                    {...(omit(props, ["label", "validate", "render"]))} />
                {(isChanged && isTouched && error) &&
                    <span className="invalid-feedback">{error}</span>}
            </React.Fragment>
        )}/>
    </FormGroup>);

Input.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
    isChanged: PropTypes.bool,
    isTouched: PropTypes.bool,
    error: PropTypes.string
};

Input.defaultProps = {
    isChanged: false,
    isTouched: false
};

export default Input;