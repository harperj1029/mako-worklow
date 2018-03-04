import React from "react";
import WorkflowNav from "./WorkflowNav";
import ReactRouterPropTypes from 'react-router-prop-types';
import WorkflowStep from "./WorkflowStep";
import workflowService from "../../services/workflow/workflowService";

class WorkflowContainer extends React.Component {
    render() {
        const workflowId = this.props.match.params.id;
        const workflow = workflowService.getWorkflow(workflowId);
        return (
            <div>
                <WorkflowNav />
                <WorkflowStep />
            </div>
        );
    }
}

WorkflowContainer.propTypes = {
    match: ReactRouterPropTypes.match
};

export default WorkflowContainer;