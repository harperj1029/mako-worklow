import React from 'react';
import PropTypes from "prop-types";
import control from "./control";

const Select = (props) => (
    <div className="form-group">
        <label>{props.title}</label>
        <select
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            className="form-control">
            {props.placeholder && <option value="">{props.placeholder}</option>}
            {Object.keys(props.options).map(key => {
                return (
                    <option
                        key={key}
                        value={key}>{props.options[key]}</option>
                );
            })}
        </select>
    </div>
);

Select.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};

export default control(Select);