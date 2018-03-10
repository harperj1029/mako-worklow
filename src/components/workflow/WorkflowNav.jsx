import React from "react";
import PropTypes from "prop-types";

const WorkflowNav = ({onNavigate, allowPrevious, allowNext}) => (<div>
    <button type="button" form="steps" disabled={!allowPrevious} className="btn btn-default" onClick={() => onNavigate("previous")}>
        <span className="fa fa-chevron-left" style={{marginRight: "5px"}}></span>Previous
    </button>
    <button type="button" form="steps" disabled={!allowNext} className="btn btn-default" onClick={() => onNavigate("next")}>
        Next
        <span className="fa fa-chevron-right" style={{marginLeft: "10px"}}></span>
    </button>
</div>);

WorkflowNav.propTypes = {
    onNavigate: PropTypes.func.isRequired,
    allowPrevious: PropTypes.bool.isRequired,
    allowNext: PropTypes.bool.isRequired
};

export default WorkflowNav;