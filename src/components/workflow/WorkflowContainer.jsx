import React, {Component} from "react";
import WorkflowNav from "./WorkflowNav";
import ReactRouterPropTypes from 'react-router-prop-types';
import WorkflowForm from "./WorkflowForm";
import workflowService from "../../services/workflow/workflowService";
import debug from "../../services/debug";
import {Row, Col, PageHeader} from "react-bootstrap";
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const settings = {
    formId: "workflowForm"
};

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
            progress: 0,
            currentStepDescription: null
        };
        this.pendingNavigationAction = null;

        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    static propTypes = {
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
            progress: parseInt(((index + 1) / this.workflow.steps.length) * 100, 10),
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
        return <Component workflowData={this.workflowData} ref={ref => this.stepComponent = ref}/>
    }

    onSubmit(formIsValid) {
        if (formIsValid && (!this.stepComponent || this.stepComponent.isValid())) {
            if (this.stepComponent) {
                this.workflowData = this.stepComponent.getData();
            }
            this.navigate();
        }
    }

    render() {
        return (<React.Fragment>
                <Row className="mt-3">
                    <Col sm={3} style={{alignSelf: 'center'}}>
                        <WorkflowNav allowPrevious={this.canNavigate("previous")} formId={settings.formId}
                             allowNext={this.canNavigate("next")}
                             onSubmitClick={this.onSubmitClick}/>
                    </Col>
                    <Col sm={9} className="pb-2" style={{borderBottom: 'solid 2px #ccc'}}>{this.state.currentStepDescription && <React.Fragment>
                        <PageHeader>{this.state.currentStepDescription.title}</PageHeader>
                        <span className="help-text">{this.state.currentStepDescription.description}</span>
                    </React.Fragment>}
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col sm={3}>
                        <div style={{width: '180px'}}>
                            <CircularProgressbar percentage={this.state.progress} initialAnimation={true} />
                        </div>
                    </Col>
                    <Col sm={9}>
                        <WorkflowForm onSubmit={this.onSubmit} id={settings.formId}>
                            {this.state.currentStepDescription && this.getStep()}
                        </WorkflowForm>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default WorkflowContainer;