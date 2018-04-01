import React from 'react';
import PropTypes from "prop-types";
import Control from "./control";
import omit from "object.omit";

const defaults = {
    text: "text"
};

const Input = ({label, ...props}) => (
    <div className="form-group">
        <label>{label}</label>
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
    </div>);

Input.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    isChanged: PropTypes.bool,
    isTouched: PropTypes.bool,
    error: PropTypes.string,
    label: PropTypes.string.isRequired
};

Input.defaultProps = {
    isChanged: false,
    isTouched: false
};

export default Input;