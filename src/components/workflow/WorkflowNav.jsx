import React from "react";
import PropTypes from "prop-types";
import {ButtonGroup, Button} from "react-bootstrap";

const WorkflowNav = ({onSubmitClick, allowPrevious, allowNext, isFinishStep, formId}) => (
    <ButtonGroup>
        <Button type="submit" name="action" form={formId}  disabled={!allowPrevious}
                className="btn btn-secondary" onClick={() => onSubmitClick("previous")}>
            <span className="fa fa-chevron-left" style={{marginRight: "5px"}}></span>Previous
        </Button>
        {!isFinishStep && <Button type="submit" name="action" form={formId} disabled={!allowNext}
                                  className="btn btn-secondary" onClick={() => onSubmitClick("next")}>
            Next
            <span className="fa fa-chevron-right" style={{marginLeft: "10px"}}></span>
        </Button>
        }
        {isFinishStep &&
            <Button type="submit" name="action" form={formId}
                    className="btn btn-secondary" onClick={() => onSubmitClick("finish")}>
                Finish
                <span className="fa fa-chevron-right" style={{marginLeft: "10px"}}></span>
            </Button>
        }
    </ButtonGroup>);

WorkflowNav.propTypes = {
    onSubmitClick: PropTypes.func.isRequired,
    allowPrevious: PropTypes.bool.isRequired,
    allowNext: PropTypes.bool.isRequired,
    isFinishStep: PropTypes.bool.isRequired,
    formId: PropTypes.string.isRequired
};

export default WorkflowNav;