import React, {Component} from "react";
import WorkflowNav from "./WorkflowNav";
import ReactRouterPropTypes from 'react-router-prop-types';
import WorkflowStep from "./WorkflowStep";
import workflowService from "../../services/workflow/workflowService";
import debug from "../../services/debug";

class WorkflowContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentStepDescription: null
        };
    }

    async componentDidMount() {
        const workflowId = this.props.match.params.id;
        this.workflow = await workflowService.getWorkflow(workflowId);
        debug.errorIf(Array.isArray(this.workflow.steps) === false || this.workflow.steps.length === 0,
            `Workflow (id: ${workflowId}) is missing the required 'steps' array.`);
        this.setState({
            currentStepDescription: this.workflow.steps[0]
        });
    }

    getStep() {
        return <WorkflowStep stepDescription={this.state.currentStepDescription} />
    }

    render() {
        return (
            <div>
                <WorkflowNav/>
                {this.state.currentStepDescription && this.getStep()}
            </div>
        );
    }
}

WorkflowContainer.propTypes = {
    match: ReactRouterPropTypes.match
};

export default WorkflowContainer;