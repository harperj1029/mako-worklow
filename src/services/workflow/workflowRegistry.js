import debug from "../../services/debug";

const entries = new Map([
    ["one", "workflow1"],
    ["two", "workflow2"]
])

class WorkflowRegistry {
    getWorkflow(workflowId) {
        debug.errorIf(!workflowId || typeof workflowId !== "string", "The workflow registry requires a 'string' workflowId.");
        workflowId = workflowId.toLowerCase();
        return entries.get(workflowId);
    }
}

export default new WorkflowRegistry();