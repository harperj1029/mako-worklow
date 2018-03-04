import React from "react";

const WorkflowNav = () => (<div>
    <button type="submit" form="steps" className="btn btn-default">
        <span className="fa fa-chevron-left" style={{marginRight: "5px"}}></span>Previous
    </button>
    <button type="submit" form="steps" className="btn btn-default">
        Next
        <span className="fa fa-chevron-right" style={{marginLeft: "10px"}}></span>
    </button>
</div>);

export default WorkflowNav;