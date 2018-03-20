import React from "react";
import WorkflowStepDescription from "../../services/workflow/workflowStepDescription";
import PropTypes from 'prop-types';

const WorkflowStep = ({stepDescription}) => {
    const Step = stepDescription.component;
    return <Step/>;
};

WorkflowStep.propTypes = {
    stepDescription: PropTypes.instanceOf(WorkflowStepDescription)
};

export default WorkflowStep;