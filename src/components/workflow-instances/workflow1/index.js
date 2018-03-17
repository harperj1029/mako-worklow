import AccountInfo from "./AccountInfo";
import Preferences from "./Preferences";
import Confirmation from "./Confirmation";
import WorkflowStepDescription from "../../../services/workflow/workflowStepDescription";

export default class {
    constructor() {
        this.steps = [
            new WorkflowStepDescription({
                title: "Account info",
                description: "Enter the basics to set up your account.",
                component: AccountInfo
            }),
            new WorkflowStepDescription({
                title: "Preferences",
                description: "Set your preferences",
                component: Preferences
            }),
            new WorkflowStepDescription({
                title: "Confirmation",
                description: "Review and submit your information.",
                component: Confirmation
            })
        ]
    }
}