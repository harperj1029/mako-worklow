import React from "react";
import PropTypes from "prop-types";

const WorkflowNav = ({onSubmitClick, allowPrevious, allowNext, className}) => (<div className={`${className} btn-group`}>
    <button type="submit"  name="action" value="goPrevious" disabled={!allowPrevious}
            className="btn btn-secondary" onClick={() => onSubmitClick("previous")}>
        <span className="fa fa-chevron-left" style={{marginRight: "5px"}}></span>Previous
    </button>
    <button type="submit" name="action" value="goNext" disabled={!allowNext}
            className="btn btn-secondary" onClick={() => onSubmitClick("next")}>
        Next
        <span className="fa fa-chevron-right" style={{marginLeft: "10px"}}></span>
    </button>
</div>);

WorkflowNav.propTypes = {
    onSubmitClick: PropTypes.func.isRequired,
    allowPrevious: PropTypes.bool.isRequired,
    allowNext: PropTypes.bool.isRequired,
    className: PropTypes.string
};

export default WorkflowNav;