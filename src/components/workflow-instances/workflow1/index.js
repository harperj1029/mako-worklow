import Step1 from "./Step1";
import Step2 from "./Step2";
import WorkflowStepDescription from "../../../services/workflow/workflowStepDescription";

export default class {
    constructor() {
        this.steps = [
            new WorkflowStepDescription({
                title: "Step 1",
                description: "Step 1",
                component: Step1
            }),
            new WorkflowStepDescription({
                title: "Step 2",
                description: "Step 2",
                component: Step2
            })
        ]
    }
}