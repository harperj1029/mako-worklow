import registry from "./workflowRegistry";

class WorkflowFactory {
    async getWorkflow(workflowId) {
        workflowId = workflowId.toLowerCase();

        const workflowPathSegment = registry.getWorkflow(workflowId);
        const workflow = await import("../../components/workflow-instances/" + workflowPathSegment + "/index");
        return new workflow.default();
    }
}

export default new WorkflowFactory();