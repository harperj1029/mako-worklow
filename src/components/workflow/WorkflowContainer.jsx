import React, {Component} from "react";
import WorkflowNav from "./WorkflowNav";
import ReactRouterPropTypes from 'react-router-prop-types';
import WorkflowForm from "./WorkflowForm";
import workflowService from "../../services/workflow/workflowService";
import debug from "../../services/debug";

class WorkflowContainer extends Component {
    constructor(props, context) {
        super(props, context);

        this.workflow = null;
        this.workflowData = {
            accountInfo: {
                fullName: "Jason Harper",
                email: "foo@bar.com",
                accountType: "premium"
            }
        };
        this.state = {
            stepIndex: 0,
            currentStepDescription: null
        };
        this.pendingNavigationAction = null;

        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    static propTypes  = {
        match: ReactRouterPropTypes.match
    };

    async componentDidMount() {
        const workflowId = this.props.match.params.id;
        this.workflow = await workflowService.getWorkflow(workflowId);
        debug.errorIf(Array.isArray(this.workflow.steps) === false || this.workflow.steps.length === 0,
            `Workflow (id: ${workflowId}) is missing the required 'steps' array.`);
        this.setCurrentStepInfo(0, this.workflow.steps[0]);
    }

    setCurrentStepInfo(index, stepDescription) {
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
        this.setCurrentStepInfo(targetIndex, this.workflow.steps[targetIndex]);
    }

    onSubmitClick(action) {
        // Store which action we'll fire off. This sux.
        this.pendingNavigationAction = action;
    }

    getStep() {
        const Component = this.state.currentStepDescription.component;
        return <Component workflowData={this.workflowData} ref={ref => this.stepComponent = ref} />
    }

    onSubmit(formIsValid) {
        if(formIsValid && (!this.stepComponent || this.stepComponent.isValid())) {
            if(this.stepComponent) {
                this.workflowData = this.stepComponent.getData();
            }
            this.navigate();
        }
    }

    render() {
        return (<React.StrictMode>
                <WorkflowForm onSubmit={this.onSubmit}>
                    <WorkflowNav allowPrevious={this.canNavigate("previous")}
                                 allowNext={this.canNavigate("next")}
                                 onSubmitClick={this.onSubmitClick}/>
                    {this.state.currentStepDescription && this.getStep()}
                </WorkflowForm>
                <pre>{JSON.stringify(this.workflowData, null, 2)}</pre>
            </React.StrictMode>
        );
    }
}

export default WorkflowContainer;