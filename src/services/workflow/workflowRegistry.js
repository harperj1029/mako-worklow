import debug from "../../services/debug";

const entries = new Map([
    ["one", "workflow1"],
    ["two", "workflow2"]
])

class WorkflowRegistry {
    getWorkflow(workflowId) {
        if (!workflowId || typeof workflowId !== "string") {
            debug.error("The workflow registry requires a 'string' workflowId.");
        }
        workflowId = workflowId.toLowerCase();
        return entries.get(workflowId);
    }
}

export default new WorkflowRegistry();