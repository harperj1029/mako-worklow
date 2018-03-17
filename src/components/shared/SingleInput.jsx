import React from 'react';
import PropTypes from "prop-types";

const defaults = {
    text: "text"
};

const SingleInput = (props) => (
    <div className="form-group">
        <label>{props.title}</label>
        <input
            className="form-control"
            name={props.name}
            type={props.inputType || defaults.text}
            value={props.content}
            onChange={props.controlFunc}
            placeholder={props.placeholder} />
    </div>
);

SingleInput.propTypes = {
    inputType: PropTypes.oneOf(['text', 'number']),
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    controlFunc: PropTypes.func.isRequired,
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    placeholder: PropTypes.string,
};

export default SingleInput;