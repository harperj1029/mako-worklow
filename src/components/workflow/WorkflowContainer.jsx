import React, {Component} from "react";
import WorkflowNav from "./WorkflowNav";
import ReactRouterPropTypes from 'react-router-prop-types';
import WorkflowStep from "./WorkflowStep";
import workflowService from "../../services/workflow/workflowService";
import debug from "../../services/debug";

class WorkflowContainer extends Component {
    constructor(props) {
        super(props);

        this.workflow = null;
        this.state = {
            stepIndex: 0,
            currentStepDescription: null
        };

        this.navigate = this.navigate.bind(this);
    }

    async componentDidMount() {
        const workflowId = this.props.match.params.id;
        this.workflow = await workflowService.getWorkflow(workflowId);
        debug.errorIf(Array.isArray(this.workflow.steps) === false || this.workflow.steps.length === 0,
            `Workflow (id: ${workflowId}) is missing the required 'steps' array.`);
        this.setStep(0, this.workflow.steps[0]);
    }

    setStep(index, stepDescription) {
        this.setState({
            stepIndex: index,
            currentStepDescription: stepDescription
        });
    }

    canNavigate(action) {
        const isLoaded = !!this.state.currentStepDescription;
        switch (action) {
            case "previous":
                return isLoaded && this.state.stepIndex > 0;
            case "next":
                return isLoaded && this.state.stepIndex < this.workflow.steps.length - 1;
            default:
                debug.error(`Action ${action} is not a supported navigation action.`)
        }
    }

    navigate(action) {
        let targetIndex;
        switch (action) {
            /* custom nav actions can go here */
            default:
                debug.errorIf(action !== "previous" && action !== "next", `Action ${action} is not a supported navigation action.`)
                targetIndex = this.state.stepIndex + (action === "previous" ? -1 : 1);
                break;
        }
        this.setStep(targetIndex,  this.workflow.steps[targetIndex]);
    }

    getStep() {
        return <WorkflowStep stepDescription={this.state.currentStepDescription}/>
    }

    render() {
        return (
            <div>
                <WorkflowNav allowPrevious={this.canNavigate("previous")}
                             allowNext={this.canNavigate("next")}
                             onNavigate={this.navigate}/>
                {this.state.currentStepDescription && this.getStep()}
            </div>
        );
    }
}

WorkflowContainer.propTypes = {
    match: ReactRouterPropTypes.match
};

export default WorkflowContainer;