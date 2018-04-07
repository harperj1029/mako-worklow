import React from "react";
import PropTypes from "prop-types";
import {ButtonGroup, Button} from "react-bootstrap";

const WorkflowNav = ({onSubmitClick, allowPrevious, allowNext, formId}) => (
    <ButtonGroup>
        <Button type="submit" name="action" value="goPrevious" form={formId}  disabled={!allowPrevious}
                className="btn btn-secondary" onClick={() => onSubmitClick("previous")}>
            <span className="fa fa-chevron-left" style={{marginRight: "5px"}}></span>Previous
        </Button>
        <Button type="submit" name="action" value="goNext"  form={formId} disabled={!allowNext}
                className="btn btn-secondary" onClick={() => onSubmitClick("next")}>
            Next
            <span className="fa fa-chevron-right" style={{marginLeft: "10px"}}></span>
        </Button>
    </ButtonGroup>);

WorkflowNav.propTypes = {
    onSubmitClick: PropTypes.func.isRequired,
    allowPrevious: PropTypes.bool.isRequired,
    allowNext: PropTypes.bool.isRequired,
    formId: PropTypes.string.isRequired
};

export default WorkflowNav;