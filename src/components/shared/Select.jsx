import React from 'react';
import PropTypes from "prop-types";
import Control from "./control";
import omit from "object.omit";
import {FormGroup, ControlLabel} from "react-bootstrap";

const Select = ({label, unselectedText, options, ...props}) => (
    <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        <Control label={label} {...props} render={({isChanged, isTouched, error, ...props}) => (
            <React.Fragment>
                <select
                    className={`form-control ${isChanged && isTouched && error ? "is-invalid" : ""}`}
                    name={props.name}
                    {...(omit(props, ["label", "validate", "render"]))}>
                    {unselectedText && <option value="">{unselectedText}</option>}
                    {Object.keys(options).map(key => {
                        return (
                            <option
                                key={key}
                                value={key}>{options[key]}</option>
                        );
                    })}
                </select>
                {(isChanged && isTouched && error) &&
                    <span className="invalid-feedback">{error}</span>}
            </React.Fragment>
        )}/>
    </FormGroup>
);

Select.propTypes = {
    name: PropTypes.string.isRequired,
    unselectedText: PropTypes.string,
    options: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    isChanged: PropTypes.bool,
    isTouched: PropTypes.bool,
    error: PropTypes.string,
};

export default Select;
