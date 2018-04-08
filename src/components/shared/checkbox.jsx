import {FormGroup, Checkbox as BootStrapCheckbox} from "react-bootstrap";
import React from 'react';
import PropTypes from "prop-types";
import Control from "./control";
import Input from "./Input";
import omit from "object.omit";

const Checkbox = ({label, ...props}) => (
    <FormGroup>
        <Control label={label} {...props} render={({isChanged, isTouched, error, checked, ...props}) => (
            <React.Fragment>
              {<BootStrapCheckbox checked={checked} {...(omit(props, ["label", "validate", "render"]))}>
                    {label}
                </BootStrapCheckbox>}
                {(isChanged && isTouched && error) &&
                <span className="invalid-feedback">{error}</span>}
            </React.Fragment>
        )} />
    </FormGroup>
);

Checkbox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isChanged: PropTypes.bool,
    isTouched: PropTypes.bool,
    error: PropTypes.string
};

Input.defaultProps = {
    isChanged: false,
    isTouched: false
};

export default Checkbox;