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
        this.pendingNavigationAction = null;

        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

    navigate() {
        const action = this.pendingNavigationAction;
        let targetIndex;
        switch (this.pendingNavigationAction) {
            /* custom nav actions can go here */
            default:
                debug.errorIf(action !== "previous" && action !== "next", `Action ${action} is not a supported navigation action.`)
                targetIndex = this.state.stepIndex + (action === "previous" ? -1 : 1);
                break;
        }
        this.setStep(targetIndex, this.workflow.steps[targetIndex]);
    }

    onSubmitClick(action) {
        // Store which action we'll fire off. This sux.
        this.pendingNavigationAction = action;
    }

    getStep() {
        return <WorkflowStep stepDescription={this.state.currentStepDescription}/>
    }

    onSubmit(e) {
        e.preventDefault();

        this.navigate();
    }

    render() {
        return (
            <form className="mt-5" onSubmit={this.onSubmit}>
                <WorkflowNav className="mb-3" allowPrevious={this.canNavigate("previous")}
                             allowNext={this.canNavigate("next")}
                             onSubmitClick={this.onSubmitClick}/>
                {this.state.currentStepDescription && this.getStep()}
            </form>
        );
    }
}

WorkflowContainer.propTypes = {
    match: ReactRouterPropTypes.match
};

export default WorkflowContainer;