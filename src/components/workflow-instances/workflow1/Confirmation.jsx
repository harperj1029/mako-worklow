import React, {Component} from "react";
import PropTypes from "prop-types";

export default class Preferences extends Component{
    constructor(props, context){
        super(props, context);

        this.workflowData =  props.workflowData;
    }

    static propTypes  = {
        workflowData: PropTypes.object.isRequired
    };

    static contextTypes = {
        workflowForm: PropTypes.object.isRequired
    };

    isValid(){
        return true;
    }

    getData(){
        return this.workflowData;
    }

    render(){
        return  <pre>{JSON.stringify(this.workflowData, null, 2)}</pre>;
    }
}
