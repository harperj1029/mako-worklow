import React, {Component} from "react";
import WorkflowStepDescription from "../../services/workflow/workflowStepDescription";
import PropTypes from 'prop-types';

class WorkflowStep extends Component{
    render() {
        const Step = this.props.stepDescription.component;
        return (
          <div className="workflow-step">
              <Step/>
          </div>
        );
    }
}

WorkflowStep.propTypes = {
    stepDescription: PropTypes.instanceOf(WorkflowStepDescription)
};

export default WorkflowStep;