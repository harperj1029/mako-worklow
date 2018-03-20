import React from 'react';
import PropTypes from "prop-types";
import Control from "./control";

const defaults = {
    text: "text"
};

let Input = ({label, ...props}) => (
    <div className="form-group">
        <label>{label}</label>
        <Control {...props} render={({isChanged, isUsed, error, ...props}) => (
            <React.Fragment>
                <input
                    className={`form-control ${isChanged && isUsed && error ? "is-invalid" : ""}`}
                    name={props.name}
                    type={props.inputType || defaults.text}
                    placeholder={props.placeholder}
                    {...props} />
                {(isChanged && isUsed && error) &&
                <span className="invalid-feedback">{error}</span>}
            </React.Fragment>
        )}/>
    </div>);

Input.propTypes = {
    inputType: PropTypes.oneOf(['text', 'number']),
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    isChanged: PropTypes.bool,
    isUsed: PropTypes.bool,
    error: PropTypes.string,
    label: PropTypes.string.isRequired
};

Input.defaultProps = {
    isChanged: false,
    isUsed: false
};

export default Input;